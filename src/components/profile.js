import '../css/nav.css';

import React, { useState, useRef, useEffect, useContext } from 'react';
import Nav from './nav';
import AuthContext from '../context/AuthContext';
import '../css/profile.css';


export default function Profile() {
    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])

    return (
        <body>
            <Nav color = 'white' page = 'profile' rIcon = 'white'/>
            <Nav_child />
        </body>
    );
}

async function updateProfileInfo(user, authTokens, profileInfo) {
    try {
        const response = await fetch('http://89.116.21.45:8000/api/update-profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({
                user: {
                    id: user.id,
                    // Add any other user details needed for authentication
                },
                profileInfo: {
                    // Include the profileInfo data to update in the Django database
                    ...profileInfo,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            // Display a success message to the user
            alert(data.message);
        } else {
            // Handle the case where the server responds with an error
            const errorData = await response.json();
            alert(`Error updating profile: ${errorData.message}`);
        }
    } catch (error) {
        // Handle other errors, e.g., display an error message to the user
        console.error('Error updating profile:', error);
    }
}

function Nav_child() {

    let {user, authTokens} = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch('http://89.116.21.45:8000/api/users',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(data => {
            const filteredData = data.find(customUser => customUser.id === user.user_id);
            setUserData(filteredData);

        });
      }, []);

    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        // Set isEditable to true when the Edit button is clicked
        setIsEditable(true);
    };

    const [formFields, setFormFields] = useState({
        firstname: '',
        lastname: '',
        username: '',
        contact: '',
        email: '',
      });

      useEffect(() => {
        if (userData) {
            setFormFields({
                firstname: userData.first_name,
                lastname: userData.last_name,
                username: userData.username,
                contact: userData.phone_number,
                email: userData.email,
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevFields) => ({
          ...prevFields,
          [name]: value,
        }));
    };



        const handleSaveProfile = async () => {
        // Create a separate object for profile information excluding passwords
        const profileInfo = {
            firstname: formFields.firstname.trim(),
            lastname: formFields.lastname.trim(),
            username: formFields.username.trim(),
            contact: formFields.contact.trim(),
            email: formFields.email.trim(),
        };

           

        // Call the updateProfileInfo function directly for profileInfo
        await updateProfileInfo(user, authTokens, profileInfo);

        // Optionally, you can reset the formFields
        setFormFields({
            if (userData) {
                setFormFields({
                    firstname: userData.first_name,
                    lastname: userData.last_name,
                    username: userData.username,
                    contact: userData.phone_number,
                    email: userData.email,
                });
            }
        });

        // Set isEditable back to false after saving changes
        setIsEditable(false);
    };


    const [passwordFields, setPasswordFields] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        updatedPassword: '',
    });

    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
        // Reset the passwordMismatch state when either password field is changed
        setPasswordMismatch(false);
    };

    useEffect(() => {
        // Check if newPassword and confirmPassword match
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            // If passwords don't match, set passwordMismatch to true
            setPasswordMismatch(true);
        } else {
            // If passwords match, update the updatedPassword field
            setPasswordFields((prevFields) => ({
                ...prevFields,
                updatedPassword: prevFields.newPassword,
            }));
        }
    }, [passwordFields.confirmPassword]);

    const handleSaveChanges = async () => {
        // Check if newPassword and confirmPassword match
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            // If passwords don't match, show an alert
            alert("Passwords do not match! Please fix before saving.");
            return; // Exit early if passwords don't match
        }
    
        // Check if the updated password meets the requirements
        const updatedPassword = passwordFields.newPassword;
        const isPasswordValid =
            updatedPassword.length >= 8 &&
            /\d/.test(updatedPassword) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(updatedPassword);
    
        if (!isPasswordValid) {
            // If the password doesn't meet the requirements, show an alert
            alert("Password does not meet the requirements! Please fix before saving.");
            return; // Exit early if password doesn't meet requirements
        }
    
        try {
            // Make an API request to change the password using fetch
            const response = await fetch('http://89.116.21.45:8000/api/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`, // Include your authentication token here
                },
                body: JSON.stringify({
                    user: {
                        id: user.id,  // Include relevant user details, adjust as needed
                        // Add any other user details needed for authentication
                    },
                    old_password: passwordFields.oldPassword,
                    new_password1: passwordFields.newPassword,  // Change this field to new_password1
                    new_password2: passwordFields.confirmPassword,  // Change this field to new_password2
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Display a success message to the user
                alert(data.message);
    
                // Optionally, you can reset the password fields
                setPasswordFields({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    updatedPassword: '',
                });
            } else {
                // Handle the case where the server responds with an error
                const errorData = await response.json();
                alert(`Error changing password: ${errorData.message}`);
            }
        } catch (error) {
            // Handle other errors, e.g., display an error message to the user
            console.error('Error changing password:', error);
        }
    };
    

    return(
        <div class="profile">
            <div class="profile-h1">
                <p>Profile</p>
            </div>
            <div class="main-profile">
                <div class="general-info">
                    <div class="gen-info-wrapper">
                        <div class="profile-form-row">
                            <div class="profile-form-group row">
                                <label for="firstname">Firstname</label>
                                <input type="text" id="firstname" name="firstname" value={formFields.firstname} onChange={handleInputChange} disabled={!isEditable}/>
                            </div>
                            <div class="profile-form-group row">
                                <label for="lastname">Lastname</label>
                                <input type="text" id="lastname" name="lastname" value={formFields.lastname} onChange={handleInputChange} disabled={!isEditable}/>
                            </div>
                        </div>
                        <div class="profile-form-row">
                            <div class="profile-form-group row">
                                <label for="text">Username</label>
                                <input type="text" id="username" name="username" value={formFields.username} onChange={handleInputChange} disabled={!isEditable}/>
                            </div>
                            <div class="profile-form-group row">
                                <label for="contact">Contact number</label>
                                <input type="tel" id="contact" name="contact" value={formFields.contact} onChange={handleInputChange} disabled={!isEditable}/>
                            </div>
                        </div>
                        <div class="profile-form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" value={formFields.email} onChange={handleInputChange} disabled={!isEditable}/>
                        </div>
                    </div>
                </div>
                <div class="profile-actions">
                    {isEditable ? (
                        <React.Fragment>
                            <button onClick={() => setIsEditable(false)}>Cancel</button>
                        </React.Fragment>
                    ) : (
                         <button onClick={handleEdit}>Edit</button>
                    )}
                    {/* Add a button to directly call the updateProfileInfo function for formFields */}
                    <button onClick={handleSaveProfile}>Save Profile</button>
                </div>
                <div class="password-change">
                    <div class="pw-chng-form">
                    <div class="profile-form-group-pw">
                        <label for="inputPassword4">Old Password</label>
                        <input
                        type="password"
                        class="form-control"
                        id="inputPassword4"
                        name="oldPassword"
                        value={passwordFields.oldPassword}
                        onChange={handlePasswordChange}
                        />
                    </div>
                    <div class="profile-form-group-pw">
                        <label for="inputPassword5">New Password</label>
                        <input
                        type="password"
                        class="form-control"
                        id="inputPassword5"
                        name="newPassword"
                        value={passwordFields.newPassword}
                        onChange={handlePasswordChange}
                        />
                    </div>
                    <div class="profile-form-group-pw">
                        <label for="inputPassword6">Confirm Password</label>
                        <input
                        type="password"
                        class="form-control"
                        id="inputPassword6"
                        name="confirmPassword"
                        value={passwordFields.confirmPassword}
                        onChange={handlePasswordChange}
                        />
                    </div>
                    </div>
                    {passwordMismatch && (
                        <div className="password-mismatch-popup">
                            Passwords do not match! Please fix before saving.
                        </div>
                    )}
                    <div class="pw-chng-texts">
                        <p class="small-text-head">Password requirements</p>
                        <p class="small-text">To create a new password, you have to meet all of the following requirements:</p>
                        <ul class="small-text">
                            <li>Minimum 8 character</li>
                            <li>At least one special character</li>
                            <li>At least one number</li>
                            <li>Can’t be the same as a previous password</li>
                        </ul>
                    </div>
                </div>  
                <div class="profile-actions">
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <a href = "#">Log out</a>
                </div>
            </div>
        </div>
    );
};