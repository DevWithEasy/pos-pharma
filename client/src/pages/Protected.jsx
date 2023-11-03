import React from 'react';
import useUserStore from '../store/userStore';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const {isAuth} = useUserStore()
    return isAuth ? children : <Navigate to='signup'/>
};

export default Protected;