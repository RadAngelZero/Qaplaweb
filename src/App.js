import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUserProfile } from './services/database';
import { listenToAuthState } from './services/auth';

import DeQButtonPayments from './components/DeQButtonPayments/DeQButtonPayments';
import HeaderBar from './components/HeaderBar';
import MediaSelector from './screens/MediaSelector';
import ChatBot from './screens/ChatBot';

function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const MainContainer = styled(Box)({
    marginTop: '72px',
})

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

    return (<>
        <HeaderBar
            streamerName={`Rad`}
            streamerImage={`https://static-cdn.jtvnw.net/jtv_user_pictures/1e6d9d8b-a96f-4f87-8405-558a0c389bd7-profile_image-70x70.png`}
        />
        {/* <div className="App">
            <DeQButtonPayments />
        </div> */}
        {/* <MainContainer itemType='div'>
            <MediaSelector />
        </MainContainer> */}
        <MainContainer itemType='div'>
            <ChatBot />
        </MainContainer>
    </>);
}

export default App;