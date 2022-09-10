import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getStreamerPublicData, getUserProfile, listenToUserProfile } from './services/database';
import { listenToAuthState } from './services/auth';

import HeaderBar from './components/HeaderBar';
// import ChatBot from './screens/ChatBot';
import Layout from './screens/Layout';
import SignIn from './screens/SignIn';
import Checkout from './screens/Checkout';
import { GIPHY_CLIPS } from './utils/constants';
import ChatBot from './screens/ChatBot';

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
    const [mediaType, setMediaType] = useState(GIPHY_CLIPS);
    const [giphyText, setGiphyText] = useState(null);
    const [message, setMessage] = useState('');
    const [botVoice, setBotVoice] = useState(null);
    const [currentStep, setCurrentStep] = useState('deQk');
    const [cost, setCost] = useState(0);
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

        const streamerUidQuery = query.get('streamerUid');

        if (streamerUidQuery) {
            // If we found a streamerUid in the url we save it on the local storage
            localStorage.setItem('streamerUid', streamerUidQuery);
        }

        if (!streamer && localStorage.getItem('streamerUid')) {
            getStreamer(localStorage.getItem('streamerUid'));
        }
    }, [user, query, streamer]);

    const addToDonationCost = (valueToAdd) => setCost(cost + valueToAdd);

    const onDonationSent = () => {
        setMediaSelected(null);
        setGiphyText(null);
        setMessage('');
        setBotVoice(null);
        setCurrentStep('deQk');
        setCost(0);
    }

    const renderSection = () => {
        switch (currentStep) {
            case 'deQk':
                return <Layout setMediaSelected={setMediaSelected}
                        user={user}
                        streamer={streamer}
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        setGiphyText={setGiphyText}
                        onSuccess={(nextStep) => setCurrentStep(nextStep)}
                        setCost={addToDonationCost} />
            case 'chatbot':
                return <ChatBot message={message}
                        setMessage={setMessage}
                        setBotVoice={setBotVoice}
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        mediaSelected={mediaSelected}
                        setMediaSelected={setMediaSelected}
                        onSuccess={() => setCurrentStep('checkout')}
                        setCost={addToDonationCost} />
            case 'checkout':
                return <Checkout media={mediaSelected}
                        setMediaSelected={setMediaSelected}
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        giphyText={giphyText}
                        setGiphyText={setGiphyText}
                        message={message}
                        user={user}
                        botVoice={botVoice}
                        donationCost={cost}
                        setCost={addToDonationCost}
                        editMessage={() => setCurrentStep('chatbot')}
                        onSuccess={onDonationSent}
                        streamer={streamer} />
            default:
                break;
        }
    }

    // User is undefined before check auth state
    if (user !== undefined) {
        return (
            <>
            {/* User is null if no authenticated */}
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
                    {renderSection()}
                </MainContainer>
                </>
            }
            </>
        );
    }

    return null;
}

export default App;