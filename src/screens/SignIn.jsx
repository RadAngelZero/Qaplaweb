import { useState, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';

import { getTwitchUserData, signInWithTwitch } from '../services/twitch';
import { getUserToken } from '../services/functions';
import { signTwitchUser } from '../services/auth';
import { createUserProfile, updateUserProfile } from '../services/database';

function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const SignIn = ({ user }) => {
    const [streamerUid, setStreamerUid] = useState('');
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const query = useQuery();

    useEffect(() => {
        async function checkIfUsersIsSigningIn() {
            const twitchClientCode = query.get('code');

            if (!isLoadingAuth && !user && twitchClientCode) {
                setIsLoadingAuth(true);
                const tokenData = await getUserToken(twitchClientCode);
                if (tokenData && tokenData.data && tokenData.data.access_token) {
                    const userData = await getTwitchUserData(tokenData.data.access_token);
                    const user = await signTwitchUser(userData, tokenData.data);

                    if (user.isNewUser) {
                        // For a new user their uid and userName are the same than their twitch id and twitch display name
                        await createUserProfile(user.uid, user.email, user.displayName, user.photoURL, user.uid, user.displayName);
                    } else {
                        await updateUserProfile(user.uid, {
                            email: user.email,
                            userName: user.displayName,
                            photoUrl: user.photoURL
                        });
                    }

                    // Successful auth
                    // Get streamer to react
                    // const streamer = localStorage.getItem('streamerUid');
                }
            }
        }

        const streamerUid = query.get('streamerUid');

        if (streamerUid) {
            // If we found a streamerUid in the url we save it on the local storage
            localStorage.setItem('streamerUid', streamerUid);
        }

        checkIfUsersIsSigningIn();
    }, [user]);

    const signIn = () => {
        setIsLoadingAuth(true);
        signInWithTwitch();
        setIsLoadingAuth(false);
    }

    return (
        <Button onClick={signIn}>
            Sign in
        </Button>
    );
}

export default SignIn;