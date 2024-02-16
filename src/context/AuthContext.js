import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [redirectToAssessment, setRedirectToAssessment] = useState(false);

    const [Loading, setLoading] = useState(true);

    const loginUser = async (event) => {
        event.preventDefault();

            const response = await fetch('http://89.116.21.45:8000/api/token/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({'email': event.target.username.value, 'password': event.target.password.value}),
            })

            const data = await response.json();
            
            if(response.status === 200){
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))

                navigate('/');
                console.log('USER: ', authTokens)

            } else {
                alert("Invalid username or password")
            }

            
    }

    let handleLogout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');

        navigate('/login');
    }


    let updateToken = async () => {
        console.log('gags');
        const response = await fetch('http://89.116.21.45:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({'refresh': authTokens?.refresh}),
            })

            const data = await response.json();
            
            if(response.status === 200){
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                handleLogout();
            }

            setLoading(false);
    }

    

    useEffect(() => {

        if (Loading){
            updateToken();
        }

        let fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens){
                updateToken();
            }
        }, fourMinutes)

        return () => clearInterval(interval);

    }, [authTokens, Loading]);

    


    let contextData = {
        
        user:user,
        loginUser:loginUser,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        handleLogout:handleLogout,
        authTokens:authTokens,
    };


    return(
        <AuthContext.Provider value={contextData}>
            {Loading ? null : children}
        </AuthContext.Provider>
    )
}