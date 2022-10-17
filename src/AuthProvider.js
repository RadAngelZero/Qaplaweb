import { createContext, useContext, useEffect, useState } from 'react';

import { listenToAuthState } from './services/auth';
import { listenToUserProfile } from './services/database';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (user === undefined) {
            listenToAuthState(async (authUser) => {
                // Important to use user state value on conditions to prevent infinit executions
                if (!user && authUser) {
                    listenToUserProfile(authUser.uid, (userSnapshot) => {
                        if (userSnapshot.exists()) {
                            setUser(userSnapshot.val());
                        }
                    });
                    // user === undefined is first load || user to handle signOut
                } else if ((user === undefined || user) && !authUser) {
                    setUser(null);
                }
            });
        }
    }, [user]);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}