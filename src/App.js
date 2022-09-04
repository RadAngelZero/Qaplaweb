import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getStreamerPublicData, getUserProfile } from './services/database';
import { listenToAuthState } from './services/auth';

import HeaderBar from './components/HeaderBar';
// import ChatBot from './screens/ChatBot';
import Layout from './screens/Layout';
import SignIn from './screens/SignIn';

function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const MainContainer = styled(Box)({
    marginTop: '72px',
    paddingRight: 64,
    paddingLeft: 64
})

function App() {
    const [user, setUser] = useState(undefined);
    const [streamer, setStreamer] = useState(null);
    const [mediaSelected, setMediaSelected] = useState(null);
    const query = useQuery();

    useEffect(() => {
        async function getStreamer(uid) {
            const streamer = await getStreamerPublicData(uid);
            if (streamer.exists()) {
                setStreamer({ ...streamer.val(), uid });
            }
        }

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

        const streamerUidQuery = query.get('streamerUid');

        if (streamerUidQuery) {
            // If we found a streamerUid in the url we save it on the local storage
            localStorage.setItem('streamerUid', streamerUidQuery);
        }

        if (!streamer && localStorage.getItem('streamerUid')) {
            getStreamer(localStorage.getItem('streamerUid'));
        }
    }, [user, query, streamer]);

    if (user !== undefined) {
        return (
            <>
            {user === null ?
                <SignIn />
                :
                <>
                {streamer &&
                    <HeaderBar
                        streamerName={streamer.displayName}
                        streamerImage={streamer.photoUrl} />
                }
                <MainContainer itemType='div'>
                    <Layout setMediaSelected={setMediaSelected} user={user} streamer={streamer} />
                </MainContainer>
                </>
            }
            </>
        );
    }

    return null;
}

export default App;