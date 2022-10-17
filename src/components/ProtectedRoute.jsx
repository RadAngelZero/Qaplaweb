import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const ProtectedRoute = ({ children }) => {
    const user = useAuth();

    if (user === null) {
        return <Navigate to='/signin' replace />
    } else if (user === undefined) {
        return null;
    }

    return children;
}

export default ProtectedRoute;