
import { useState, useEffect, useMemo } from 'react';

import './App.css';
import { getUserProfile } from './services/database';
import { listenToAuthState } from './services/auth';

function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}


function App() {
    const [user, setUser] = useState(undefined);
    const query = useQuery();

    useEffect(() => {
        if (user === undefined) {
            listenToAuthState(async (authUser) => {
                // Important to use user state value on conditions to prevent infinit executions
                if (!user && authUser) {
                    const userSnapshot = await getUserProfile(authUser.uid);
                    setUser(userSnapshot.val());
                    // user === undefined is first load || user to handle signOut
                } else if ((user === undefined || user) && !authUser) {
                    setUser(null);
                }
            });
        }

        const streamerUid = query.get('streamerUid');

        if (streamerUid) {
            // If we found a streamerUid in the url we save it on the local storage
            localStorage.setItem('streamerUid', streamerUid);
            window.location.search = '';
        }
    }, [user, query]);

    
}

export default App;