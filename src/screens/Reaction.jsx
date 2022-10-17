import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import {
    getReactionsCosts,
    getStreamerPublicData,
    listenUserReactionsWithStreamer
} from './../services/database';
import HeaderBar from './../components/HeaderBar';
import Layout from './../screens/Layout';
import Checkout from './../screens/Checkout';
import { GIPHY_CLIPS } from './../utils/constants';
import ChatBot from './../screens/ChatBot';
import ReactionsDialog from './../components/ReactionsDialog/ReactionsDialog';
import { getUserToStreamerRelation } from './../services/functions';
import { useAuth } from '../AuthProvider';

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

function Reaction() {
    const user = useAuth();
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
    const [userStreamerRelation, setUserStreamerRelation] = useState(null);
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

        async function getUserToStreamerRelations() {
            const relationData = await getUserToStreamerRelation(user.twitchId, streamer.uid);
            if (relationData.data) {
                setUserStreamerRelation(relationData.data);
            } else {
                setUserStreamerRelation({ isFollower: false, isSubscribed: false, subscriptionTier: null });
            }
        }

        if (numberOfReactions === undefined && user && user.id && streamer) {
            getReactionsCount();
        }

        if (Object.keys(reactionsCosts).length <= 0) {
            getAllReactionsCosts();
        }

        const url = query.get('url');
        if (url && !streamer) {
            getDeepLinkInfo(url);
        }

        if (!streamer && localStorage.getItem('streamerUid') && !url) {
            getStreamer(localStorage.getItem('streamerUid'));
        }

        if (user && streamer && !userStreamerRelation) {
            getUserToStreamerRelations();
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
    }, [query, streamer]);

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
                        setMessage={setMessage}
                        numberOfReactions={numberOfReactions}
                        userStreamerRelation={userStreamerRelation} />
                );
            default:
                break;
        }
    }

    return (
        <>
        <Helmet>
            <title>
                {t('Helmet.title')}
            </title>
        </Helmet>
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
        <ReactionsDialog open={openReactionDialog}
            onClose={() => setOpenReactionDialog(false)} />
        </>
    );
}

export default Reaction;