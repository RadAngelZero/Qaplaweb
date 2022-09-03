import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getUserProfile } from './services/database';
import { listenToAuthState } from './services/auth';

function App() {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        // Only set the listener once (when user is undefined)
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
    }, [user]);

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            <code>Qapla Web</code>
            </p>
        </header>
        </div>
    );
}

export default App;