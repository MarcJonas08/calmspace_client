import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    let {user} = useContext(AuthContext);
    return (
        !user ? <Navigate to = "/login" /> : <Outlet />
    )
}


export default PrivateRoutes;