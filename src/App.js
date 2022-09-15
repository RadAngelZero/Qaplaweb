import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    getReactionsCosts,
    getStreamerPublicData,
    getStreamerUidWithQreatorCode,
    listenToUserProfile,
    listenUserReactionsWithStreamer
} from './services/database';
import { listenToAuthState } from './services/auth';

import HeaderBar from './components/HeaderBar';
import Layout from './screens/Layout';
import SignIn from './screens/SignIn';
import Checkout from './screens/Checkout';
import { GIPHY_CLIPS } from './utils/constants';
import ChatBot from './screens/ChatBot';
import ReactionsDialog from './components/ReactionsDialog/ReactionsDialog';

function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const MainContainer = styled(Box)({
    marginTop: '72px',
    paddingRight: 64,
    paddingLeft: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
    const [reactionsCosts, setreactionsCosts] = useState({});
    const [numberOfReactions, setNumberOfReactions] = useState(undefined);
    const [openReactionDialog, setOpenReactionDialog] = useState(false);
    const query = useQuery();

    useEffect(() => {
        async function getStreamerUid(qreatorCode) {
            const streamers = await getStreamerUidWithQreatorCode(qreatorCode);
            if (streamers.exists()) {
                streamers.forEach((streamer) => {
                    localStorage.setItem('streamerUid', streamer.key);
                    getStreamer(streamer.key);
                });
            } else {
                setStreamer(null);
                alert('Invalid link');
            }
        }

        async function getStreamer(uid) {
            const streamer = await getStreamerPublicData(uid);
            if (streamer.exists()) {
                setStreamer({ ...streamer.val(), uid });
            }
        }

        async function getAllReactionsCosts() {
            const costs = await getReactionsCosts();

            if (costs.exists()) {
                setreactionsCosts(costs.val());
            }
        }

        async function getReactionsCount() {
            listenUserReactionsWithStreamer(user.id, streamer.uid, (reactions) => {
                setNumberOfReactions(reactions.val() || 0);
            });
        }

        if (numberOfReactions === undefined && user && user.id && streamer) {
            getReactionsCount();
        }

        if (Object.keys(reactionsCosts).length <= 0) {
            getAllReactionsCosts();
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

        const qreatorCodeQuery = query.get('qreatorCode');

        if (qreatorCodeQuery) {
            // If we found a qreatorQode in the url we look for their streamer id
            getStreamerUid(qreatorCodeQuery);
        }

        if (!streamer && localStorage.getItem('streamerUid') && !qreatorCodeQuery) {
            getStreamer(localStorage.getItem('streamerUid'));
        }

        const reactionSent = query.get('reactionSent');
        if (reactionSent === 'true') {
            // reaction sent from backend after a successful purchase
            const dialogWasOpened = sessionStorage.getItem('reactionSent');
            if (!dialogWasOpened) {
                sessionStorage.setItem('reactionSent', 'true');
                setOpenReactionDialog(true);
            }
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
                return (
                    <Layout setMediaSelected={setMediaSelected}
                        costs={reactionsCosts}
                        numberOfReactions={numberOfReactions}
                        user={user}
                        streamer={streamer}
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        setGiphyText={setGiphyText}
                        onSuccess={(nextStep) => setCurrentStep(nextStep)}
                        setCost={addToDonationCost}
                        setMessage={setMessage} />
                );
            case 'chatbot':
                return (
                    <ChatBot message={message}
                        setMessage={setMessage}
                        costs={reactionsCosts}
                        numberOfReactions={numberOfReactions}
                        setBotVoice={setBotVoice}
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        mediaSelected={mediaSelected}
                        setMediaSelected={setMediaSelected}
                        onSuccess={() => setCurrentStep('checkout')}
                        setCost={addToDonationCost} />
                );
            case 'checkout':
                return (
                    <Checkout media={mediaSelected}
                        setMediaSelected={setMediaSelected}
                        mediaType={mediaType}
                        giphyText={giphyText}
                        setGiphyText={setGiphyText}
                        message={message}
                        user={user}
                        botVoice={botVoice}
                        donationCost={cost}
                        setCost={addToDonationCost}
                        editMessage={() => setCurrentStep('chatbot')}
                        onSuccess={onDonationSent}
                        streamer={streamer}
                        setMessage={setMessage} />
                );
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
                <SignIn user={user} />
                :
                <>
                <MainContainer itemType='div'>
                    {streamer &&
                        <HeaderBar user={user}
                            streamerName={streamer.displayName}
                            streamerImage={streamer.photoUrl} />
                    }
                    {renderSection()}
                </MainContainer>
                </>
            }
            <ReactionsDialog open={openReactionDialog}
                onClose={() => setOpenReactionDialog(false)} />
            </>
        );
    }

    return null;
}

export default App;