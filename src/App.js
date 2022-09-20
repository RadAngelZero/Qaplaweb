import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    getReactionsCosts,
    getStreamerPublicData,
    listenToUserProfile,
    listenUserReactionsWithStreamer
} from './services/database';
import { listenToAuthState } from './services/auth';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import HeaderBar from './components/HeaderBar';
import Layout from './screens/Layout';
import SignIn from './screens/SignIn';
import Checkout from './screens/Checkout';
import { GIPHY_CLIPS } from './utils/constants';
import ChatBot from './screens/ChatBot';
import ReactionsDialog from './components/ReactionsDialog/ReactionsDialog';
import { auth } from './services/firebase';

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
    const { t } = useTranslation();

    useEffect(() => {
        async function getDeepLinkInfo(url) {
            const urlDecoded = decodeURI(url);
            const urlResponse = await fetch(`https://api2.branch.io/v1/url?url=${urlDecoded}&branch_key=key_live_bg6p6DgKXOhIDT1ShRTQijhcxslLZvQ2`);
            if (urlResponse.status === 200) {
                const { data } = await urlResponse.json();
                if (data && data.streamerId) {
                    localStorage.setItem('streamerUid', data.streamerId);
                    getStreamer(data.streamerId);
                }
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

        const url = query.get('url');
        if (url && !streamer) {
            getDeepLinkInfo(url);
        }

        if (!streamer && localStorage.getItem('streamerUid') && !url) {
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
            <Helmet>
                <title>
                    {t('Helmet.title')}
                </title>
            </Helmet>
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
                    {!streamer &&
                        <h2 style={{ color: '#FFF' }}>
                            {t('noQreatorCode')}
                        </h2>
                    }
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