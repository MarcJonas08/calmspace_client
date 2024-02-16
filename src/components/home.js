import '../css/Home.css';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Home() {
    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])
      
    const [navOpen, setNavOpen] = useState(false);
    const mbNavRef = useRef(null);
    const navOpenRef = useRef(null);
  
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false)
  
  
    const handleNavOpen = () => {
      setNavOpen(!navOpen);
      document.body.style.overflow = 'hidden';
    };
    const handleNavClose = () => {
      setNavOpen(false);
      document.body.style.overflow = 'auto';
    };
  
  
    const handleLoginOpen = () => {
      setLoginOpen(true)
  
    };
    const handleLoginClose = () => {
      setLoginOpen(false)
    };

    const handleSuccessOpen = () => {
        setSuccessOpen(true)
      };
    const handleSuccessClose = () => {
        setSuccessOpen(false)
      };

      const handleErrorOpen = () => {
        setErrorOpen(true)
      };
    const handleErrorClose = () => {
        setErrorOpen(false)
      };
  
  
    const handleSignupOpen = () => {
      setSignupOpen(true)
    };
    const handleSignupClose = () => {
      setSignupOpen(false)
    };
  
      useEffect(() => {
      const handleClickOutside = (event) => {
          const mbNavMain = mbNavRef.current;
          const navOpenMain = navOpenRef.current;
  
          if (!mbNavMain.contains(event.target) && !navOpenMain.contains(event.target)) {
              setNavOpen(!navOpen);
          }
      };
  
  
      if (navOpen === true) {
          document.body.addEventListener('click', handleClickOutside);
      }
  
      return () => {
          document.body.removeEventListener('click', handleClickOutside);
      }
      
  }, [navOpen]);


        const [users, setUsers] = useState([]);

        useEffect (() => {

            getUsers();

        }, []);

        


        let getUsers = async () => {
            let response = await fetch('http://89.116.21.45:8000/api/');
            let data = await response.json();
            setUsers(data);
        }

        const [registerForm, setRegisterForm] = useState({
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            phone_number: null,
            gender: null,
            password: null
        });


        const [password1, setPassword1] = useState(null);
        const [password2, setPassword2] = useState(null);
        const [password, setPassword] = useState(null);

        const handlePassword1 = (event) => {
            setPassword1(event.target.value);
        };
        const handlePassword2 = (event) => {
            setPassword2(event.target.value);
        };
        
        

        let createUser = async () => {
            fetch('http://89.116.21.45:8000/api/create-user/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'first_name': registerForm.first_name.trim(),
                    'last_name': registerForm.last_name.trim(),
                    'username': registerForm.username.trim(),
                    'email': registerForm.email.trim(),
                    'phone_number': registerForm.phone_number.trim(),
                    'gender': registerForm.gender.trim(),
                    'password': registerForm.password.trim()
                }),
            })
            .then(response => {
                if (response.ok) {
                    // Handle success, maybe display a success message or redirect
                    handleSuccessOpen();
                } else {
                    // Handle HTTP errors
                    handleErrorOpen();
                }
            })
            .catch(error => {
                // Handle network errors or other issues
                console.error('Error:', error);
            });
        }


        useEffect(() => {
            if (password1 === password2){
                setRegisterForm((prevForm) => ({
                    ...prevForm,
                    password: password2,
                  }));
                setPasswordsMatch(true);
            } else {
                setPasswordsMatch(false)
            }
          }, [password2]);


        const [passwordsMatch, setPasswordsMatch] = useState(true);
        const [strongPW, setStrongPW] = useState(true);


        const [emailError, setEmailError] = useState(false);
        const [usernameError, setUsernameError] = useState(false);
      
        const checkEmailAvailability = () => {
          fetch(`https://89.116.21.45:8000/api/check_email/?email=${registerForm.email}`)
              .then(response => response.json())
              .then(data => {
                  if (data.is_taken) {
                      setEmailError(true);
                  } else {
                      setEmailError(false);
                  }
              })
              .catch(error => console.error('Error:', error));
      }
      
      const checkUsernameAvailability = () => {
          fetch(`https://89.116.21.45:8000/api/check_username/?username=${registerForm.username}`)
              .then(response => response.json())
              .then(data => {
                  if (data.is_taken) {
                      setUsernameError(true);
                  } else {
                      setUsernameError(false);
                  }
              })
              .catch(error => console.error('Error:', error));
      }

        const handlePasswordValidation = (event) => {
            
            event.preventDefault();

            if (
                registerForm.password.length >= 8 &&
                /[a-z]/.test(registerForm.password) && // At least one lowercase letter
                /[A-Z]/.test(registerForm.password) && // At least one uppercase letter
                /\d/.test(registerForm.password) // At least one digit
            ){
                setStrongPW(true);

                createUser();
                resetForm();

                handleSignupClose();
                    
            } else {
                setStrongPW(false);
            }

        };

        const resetForm = () => {
            setRegisterForm({
              first_name: '',
              last_name: '',
              username: '',
              email: '',
              phone_number: '',
              gender: '',
              password: ''
            });

            setPassword1('');
            setPassword2('');
            setPassword('');
          };

        const handleInputChange = (event) => {
            const { name, value } = event.target;

            setRegisterForm((prevForm) => ({
              ...prevForm,
              [name]: value
            }));
        };

    let {loginUser} = useContext(AuthContext);

    const [openTC, setOpenTC] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
        
    return (
      <div>
        <div className="bg-imgs">
            <div className="head">
                <img src= "img/header.png" />
            </div>
            <div className="center">
                <img src= "img/girl-swing.svg" />
            </div>
            <div className="foot">
                <img src= "img/footer.svg" />
            </div>
            <div className="foot-img">
                <img src="img/bot-r.svg" id = "bot-r" />
                <img src="img/bot-l.svg" id = "bot-l" />
            </div>
        </div>
  
        <nav>
            <div className='brand'>
                <img src='/img/logo.png'></img>
                <Link to = "/"><h1 className='nav-h1'>CalmSpace</h1></Link>
            </div>
            <ul>
                <Link to = "/public/assessment"><li className = "nav-links">Assessments</li></Link>
                <Link to = "/public/exercise"><li className = "nav-links">Exercises</li></Link>
                <Link to = "/public/resource-hub"><li className = "nav-links">Resource Hub</li></Link>
                <Link to = "/public/clinic"><li className = "nav-links">Clinic</li></Link>
                <li id = "login" onClick={handleLoginOpen}>Log In</li>
            </ul>
            <div className="mob-nav" id = "mb-nav-open" ref={navOpenRef} onClick={handleNavOpen}>
                <ion-icon name="menu"></ion-icon>
            </div>
            <div className ="mb-nav-main" id = "mb-nav-main" ref={mbNavRef} style = {{display : navOpen === true ? 'flex' : 'none'}}>
                <div className ="mb-nav-head" id = "mb-nav-close" onClick={handleNavClose}>
                    <ion-icon name ="close"></ion-icon>
                </div>
                <ul>
                    <Link to = "/public/assessment">
                        <li className = "mb-nav-opt"><ion-icon name="document-text" className = "mb-nav-icon"></ion-icon> Assessments</li>
                    </Link>
                    <Link to = "/public/exercise">
                        <li className = "mb-nav-opt"><ion-icon name="barbell" className = "mb-nav-icon"></ion-icon> Exercises</li>
                    </Link>
                    <Link to = "/public/resource-hub">
                        <li className = "mb-nav-opt"><ion-icon name="cube" className = "mb-nav-icon"></ion-icon> Resource Hub</li>
                    </Link>
                    <Link to = "/public/clinic">
                        <li className = "mb-nav-opt"><ion-icon name="medkit"></ion-icon> Clinic</li>
                    </Link>
                    <a>
                        <li className = "mb-nav-opt" id = "mb-nav-login" onClick={handleLoginOpen}><ion-icon name="log-in"></ion-icon> Log in</li>
                    </a>
                </ul>
            </div>
        </nav>
  
        <section className ="main-sec">
          <h1>Providing High Quality <br />Mental Health Care</h1>
          <p>
            At Wayside Psyche Resources Center, the go-to Mental Health Clinic in Santa Maria Bulacan, 
            our goal is simple: to give top-notch mental health care that truly helps. Our friendly team of 
            experts is here to create a safe place where you can feel better and grow. We're all about 
            taking steps together to make your mental health journey a success.</p>
          <p id = "register" onClick={handleSignupOpen}>Register now</p>
        </section>
  
        <section className = "bg-login" id = "bg-login" style = {{display : loginOpen === true || signupOpen === true ? 'flex' : successOpen === true ? 'flex' : errorOpen === true ? 'flex' : 'none'}} onClick={() => { handleLoginClose(); handleSignupClose(); handleSuccessClose();}}>
  
        </section>
  
        <div className="login-frm" id= "login-frm" style = {{display : loginOpen === false ? 'none' : 'flex'}}>
          <h2>Login</h2><br />
          <form onSubmit={loginUser}>
              <div className="form-group">
                  <input type="text" id="username" name="username" required placeholder="Email" />
              </div>
              <div className="form-group">
                  <input type="password" id="password" name="password" required placeholder="Password"/>
              </div>
              <div className="form-group" id = "form-group-a">
                  <a href="#" id = "login-to-signup" onClick={() => { handleLoginClose(); handleSignupOpen(); }}>Sign up</a>
              </div>
              <div className="form-group">
                  <button type="submit">Login</button>
              </div>
          </form>
          <div className="form-close" id = "login-close" onClick={handleLoginClose}>
              <ion-icon name="close"></ion-icon>
          </div>
        </div>
  
        <div className = "signup-frm" id= "signup-frm" style = {{display : signupOpen === false ? 'none' : 'flex'}}>
  
        <h2>Sign Up</h2>
          <form onSubmit={handlePasswordValidation}>
  
              <div className ="form-group" id='fn-ln'>
                  <input type="text" id="sgnUp-firstName" name="first_name" value={registerForm.first_name} required placeholder="First Name" onChange={handleInputChange}/>
  
                  <input type="text" id="sgnUp-lastName" name="last_name" value={registerForm.last_name} required placeholder="Last Name" onChange={handleInputChange}/>
              </div>
  
              <div className ="form-group">
                  <input type="text" id="sgnUp-username" name="username" value={registerForm.username} required placeholder="Username" onChange={handleInputChange} onBlur={checkUsernameAvailability} style={{ border: usernameError ? '1px solid red' : '' }}/>
                  <div className='signup-error' id='error-1' style={{ display: usernameError ? 'flex' : 'none' }}>
                    <ion-icon name="warning" id='error-icon-1'></ion-icon>
                    <p>Username already in use!</p>
                  </div>
              </div>
  
              <div className ="form-group">
                  <input type="email" id="sgnUp-email" name="email" value={registerForm.email} required placeholder="Email" onChange={handleInputChange} onBlur={checkEmailAvailability} style={{ border: emailError ? '1px solid red' : '' }}/>
                  <div className='signup-error' id='error-2' style={{ display: emailError ? 'flex' : 'none' }}>
                    <ion-icon name="warning" id='error-icon-1'></ion-icon>
                    <p>Email already in use!</p>
                  </div>
              </div>
  
              <div className ="form-group">
                  <input type="tel" id="sgnUp-phoneNumber" name="phone_number" value={registerForm.phone_number} required placeholder="Phone Number" onChange={handleInputChange}/>
              </div>
  
              <div className ="form-group">
                  <input type="password" id="sgnUp-password" name="password1" value={password1} required placeholder="Password" onChange={handlePassword1} style={{ border: passwordsMatch ? '' : '1px solid red' }}/>
                  <div className='signup-error' id='error-3'  style={{ display: strongPW ? 'none' : 'flex' }}>
                    <ion-icon name="warning" id='error-icon-1'></ion-icon>
                    <p>Weak password <br /><br />Please include at least 8 characters, <br />one uppercase letter,<br /> one lowercase letter,<br /> and one digit.</p>
                  </div>
              </div>
  
              <div className ="form-group">
                  <input type="password" id="sgnUp-confirmPassword" name="password2" value={password2} required placeholder="Confirm Password" onChange={handlePassword2} style={{ border: passwordsMatch ? '' : '1px solid red' }}/>
                  <div className='signup-error' id='error-4' style={{ display: passwordsMatch ? 'none' : 'flex' }}>
                    <ion-icon name="warning" id='error-icon-1'></ion-icon>
                    <p>Password does not match!</p>
                  </div>
              </div>
  
              <div className ="form-group" id="form-group-rad">
                  <label for="gender">Gender</label>
                  <div className ="radio-group">
  
                      <div className ="radio-cont">
                          <input type="radio" id="male" name="gender" value="Male" checked={registerForm.gender === 'Male'} required onChange={handleInputChange}/>
                          <label for="male">Male</label>
                      </div>
                      
                      <div className ="radio-cont">
                          <input type="radio" id="female" name="gender" value="Female" checked={registerForm.gender === 'Female'} required onChange={handleInputChange}/>
                          <label for="female">Female</label>
                      </div>
  
                      <div className ="radio-cont">
                          <input type="radio" id="other" name="gender" value="Other" checked={registerForm.gender === 'Other'} required onChange={handleInputChange}/>
                          <label for="other">Other</label>
                      </div>
  
                  </div>
  
              </div>

              <div className ="form-group" id="form-group-terms">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" onChange={(e) => setAgreeTerms(e.target.checked)} />
                <label htmlFor="agreeTerms">I agree to the <a href="#" onClick={(e) => { e.preventDefault(); setOpenTC(true); }}>Terms and Conditions</a></label>
            </div>
  
              <div className ="form-group">
                  <button type="submit" disabled={!agreeTerms || emailError || usernameError}>Sign Up</button>
              </div>
  
              <div className="form-close" id = "signup-close"  onClick={handleSignupClose}>
                <ion-icon name="close"></ion-icon>
              </div>
          </form>
  
        </div>
        <div className='success-register' style={{display: successOpen === true ? 'flex' : 'none'}}>
            <ion-icon name="checkmark-circle" id='success-icon'></ion-icon>
            <p>Account created successfully!</p>
            <p style={{textAlign: 'center'}}>Please check your email to verify your account</p>
            <button onClick={handleSuccessClose}>Continue</button>
        </div>
        <div className='success-register' style={{display: errorOpen === true ? 'flex' : 'none'}}>
        <ion-icon name="close-circle" id='error-icon'></ion-icon>
            <p>Error creating account</p>
            <button onClick={handleErrorClose}>Continue</button>
        </div>

        <div className='tc-wrapper' style={{display: openTC ? 'flex' : 'none'}}>
            <TermsAndConditions setOpenTC={setOpenTC}/>
        </div>
      </div>
    );
  }



function TermsAndConditions({ setOpenTC }) {
    return (
        <div className='tc-container'>
            <h2>Terms and Conditions of CalmSpace Website Use</h2>
            <p>
                These terms and conditions outline the rules and regulations for the use of CalmSpace website, located at www.calm-space.online.
            </p>
            <p>
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use CalmSpace if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You", and "Your" refer to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our", and "Us", refer to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of [Country]. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to same.
            </p>
            <h3>Cookies</h3>
            <p>
                We employ the use of cookies. By accessing CalmSpace, you agree to use cookies in agreement with CalmSpace's Privacy Policy.
            </p>
            <p>
                Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
            </p>
            <h3>License</h3>
            <p>
                Unless otherwise stated, CalmSpace and/or its licensors own the intellectual property rights for all material on CalmSpace. All intellectual property rights are reserved. You may access this from CalmSpace for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>
                You must not:
            </p>
            <ul>
                <li>Republish material from CalmSpace</li>
                <li>Sell, rent, or sub-license material from CalmSpace</li>
                <li>Reproduce, duplicate, or copy material from CalmSpace</li>
                <li>Redistribute content from CalmSpace</li>
            </ul>
            <p>
                This Agreement shall begin on the date hereof.
            </p>
            <h3>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. CalmSpace does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of CalmSpace, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, CalmSpace shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
            </h3>
            <p>
                CalmSpace reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>
            <p>
                You warrant and represent that:
            </p>
            <ul>
                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material which is an invasion of privacy;</li>
                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            <p>
                You hereby grant CalmSpace a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce, and edit any of your Comments in any and all forms, formats, or media.
            </p>
            <h3>Hyperlinking to our Content</h3>
            <p>
                The following organizations may link to our Website without prior written approval:
            </p>
            <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.</li>
            </ul>
            <p>
                These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
            </p>
            <p>
                We may consider and approve other link requests from the following types of organizations:
            </p>
            <ul>
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law, and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
            </ul>
            <p>
                We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of CalmSpace; and (d) the link is in the context of general resource information.
            </p>
            <p>
                These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
            </p>
            <p>
                If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to CalmSpace. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
            </p>
            <p>
                Approved organizations may hyperlink to our Website as follows:
            </p>
            <ul>
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
            </ul>
            <p>
                No use of CalmSpace's logo or other artwork will be allowed for linking absent a trademark license agreement.
            </p>
            <h3>iFrames</h3>
            <p>
                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
            </p>
            <h3>Content Liability</h3>
            <p>
                We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third.
            </p>
            <button onClick={() => {setOpenTC(false)}}>Close</button>
        </div>
    );
}

