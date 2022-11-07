import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, Button, InputBase, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SendIcon } from '../assets/icons/SendIcon.svg';
import { getAnimationData, getStreamerAlias, getStreamerIsStreaming, getStreamerPublicDisplayName, getUserGreetingAnimation, saveUserGreetingMessage, writeStreamGreeting } from '../services/database';
import { useAuth } from '../AuthProvider';
import AvatarReadyDialog from '../components/AvatarReadyDialog';
import { getUserToStreamerRelation } from '../services/functions';
import { getCurrentLanguage } from '../utils/i18n';
import PopUpSentDialog from '../components/PopUpSentDialog';
import PopUpAlreadySentDialog from '../components/PopUpAlreadySentDialog';
import NotASubDialog from '../components/NotASubDialog';
import StreamerOfflineDialog from '../components/StreamerOfflineDialog';
import PopUpFromMobileDialog from '../components/PopUpFromMobileDialog';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center'
});

const InnerContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '835px'
});

const Title = styled(Typography)({
    fontSize: '22px',
    fontWeight: '500',
    color: '#FFF',
    marginLeft: '32px',
    marginTop: '72px'
});

const TTSContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
});

const SenderChatBubble = styled(Box)({
    marginBottom: '24px',
    backgroundColor: '#141539',
    padding: '16px 24px',
    borderRadius: '4px 20px 20px 20px',
    alignSelf: 'flex-start',
    display: 'flex',
});

const UserChatBubble = styled(Box)({
    marginBottom: '24px',
    backgroundColor: '#3D42DF',
    padding: '16px 24px',
    borderRadius: '20px 4px 20px 20px',
    alignSelf: 'flex-end',
    display: 'flex',
});

const ChatBubbleTextBot = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
});

const ChatBubbleTextUser = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
});

const TextAccent = styled('span')({
    color: '#00FFDD'
});

const ChatInputExternalContainer = styled(Box)({
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#141539',
    padding: '16px 0px',
});

const ChatInputContainer = styled(Paper)({
    flex: 1,
    display: 'flex',
    backgroundColor: '#0D1021',
    height: '38px',
    padding: '0px 16px',
    borderRadius: '50px',
    minWidth: '260px',
    marginLeft: 16
});

const ChatInput = styled(InputBase)({
    flex: 1,
    color: '#fff',
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '28px',
    letterSpacing: '1px',
    verticalAlign: 'middle',
});

const SendIconContainer = styled(Box)({
    marginLeft: '16px',
    marginRight: '16px',
    cursor: 'pointer'
});

const OptionButton = styled(Button)({
    padding: 3,
    backgroundColor: '#0000',
    border: '2px solid',
    color: '#FF9BB3',
    borderRadius: '20px',
    alignSelf: 'flex-end',
    textTransform: 'none',
    padding: '16px 24px',
    marginTop: 16
});

const ConfirmationButton = styled(Button)({
    backgroundColor: '#00FFDD',
    border: '2px solid',
    color: '#0D1021',
    borderRadius: '20px',
    alignSelf: 'flex-end',
    textTransform: 'none',
    padding: '16px 24px',
    marginTop: 16,
    fontSize: 16,
    marginBottom: 24,
    fontWeight: '700',
    '&:hover': {
        backgroundColor: '#00FFDD',
        opacity: 0.95
    }
});

const GreetingTTSScreen = () => {
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const [openReadyDialog, setOpenReadyDialog] = useState(false);
    const [openPopUpSentDialog, setOpenPopUpSentDialog] = useState(false);
    const [openAlreadySentDialog, setOpenAlreadySentDialog] = useState(false);
    const [openNotASubDialog, setOpenNotASubDialog] = useState(false);
    const [openStreamerOfflineDialog, setOpenStreamerOfflineDialog] = useState(false);
    const [openPopUpFromMobileDialog, setOpenPopUpFromMobileDialog] = useState(false);
    const [streamerAlias, setStreamerAlias] = useState('');
    const [streamerName, setStreamerName] = useState('');
    const [loadingPopUp, setLoadingPopUp] = useState(false);
    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        async function getAnimation() {
            const userAnimation = await getUserGreetingAnimation(user.id);
            const animationData = await getAnimationData(userAnimation.val().animationId);
            setAnimationData({ ...animationData.val(), id: animationData.key });
        }

        async function getStreamerData() {
            const streamerUid = location.state?.streamerUid;
            if (streamerUid) {
                const alias = await getStreamerAlias(streamerUid);
                setStreamerAlias(alias);
            }

            const displayName = await getStreamerPublicDisplayName(streamerUid);
            setStreamerName(displayName.val() || '');
        }

        getAnimation();
        getStreamerData();
    }, []);

    const handleSendButton = async (e) => {
        if (e.type === 'click' || e.key === 'Enter') {
            setMessageSent(true);
        }
    }

    const saveMessage = async () => {
        await saveUserGreetingMessage(user.id, message);
        setOpenReadyDialog(true);
    }

    const popUpNow = async () => {
        setLoadingPopUp(true);
        const streamerUid = location.state?.streamerUid;
        const isStreaming = await getStreamerIsStreaming(streamerUid);
        if (isStreaming.val()) {
            const relationData = await getUserToStreamerRelation(user.twitchId, streamerUid);
            if (relationData.data?.isSubscribed) {
                try {
                    await writeStreamGreeting(
                        user.id,
                        streamerUid,
                        user.avatarId,
                        animationData.id,
                        message,
                        user.twitchUsername,
                        getCurrentLanguage()
                    );
                    setOpenReadyDialog(false);
                    setOpenPopUpSentDialog(true);
                } catch (error) {
                    setOpenReadyDialog(false);
                    setOpenAlreadySentDialog(true);
                }
            } else {
                setOpenReadyDialog(false);
                setOpenNotASubDialog(true);
            }
        } else {
            setOpenReadyDialog(false);
            setOpenStreamerOfflineDialog(true);
        }
        setLoadingPopUp(false);
    }

    const backToProfile = () => {
        navigate(`/profile/${streamerAlias}`);
    }

    return (
        <Container>
            <InnerContainer>
                <Title>
                    💬 Text-to-speech
                </Title>
                <TTSContainer>
                    <SenderChatBubble>
                        <ChatBubbleTextBot>
                            <TextAccent>
                                {t('GreetingTTSScreen.makeAnEntrance')}
                            </TextAccent>
                            {t('GreetingTTSScreen.sayHi')}
                        </ChatBubbleTextBot>
                    </SenderChatBubble>
                    {messageSent ?
                        <>
                        <UserChatBubble>
                            <ChatBubbleTextUser>
                                {message}
                            </ChatBubbleTextUser>
                        </UserChatBubble>
                        <SenderChatBubble>
                            <ChatBubbleTextBot>
                                {t('GreetingTTSScreen.readyToSave')}
                            </ChatBubbleTextBot>
                        </SenderChatBubble>
                        <OptionButton onClick={() => setMessageSent(false)}>
                            <ChatBubbleTextBot>
                                {t('GreetingTTSScreen.editMessage')}
                            </ChatBubbleTextBot>
                        </OptionButton>
                        <ConfirmationButton onClick={saveMessage}>
                            {t('GreetingTTSScreen.ready')}
                        </ConfirmationButton>
                        </>
                        :
                        <ChatInputExternalContainer style={{ justifyContent: 'flex-end' }} itemType='div'>
                            <ChatInputContainer itemType='div'>
                                <ChatInput autoFocus
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleSendButton}
                                    inputProps={{
                                        maxLength: 40
                                    }} />
                            </ChatInputContainer>
                            <SendIconContainer itemType='div'>
                                <SendIcon onClick={handleSendButton} />
                            </SendIconContainer>
                        </ChatInputExternalContainer>
                    }
                </TTSContainer>
            </InnerContainer>
            <AvatarReadyDialog open={openReadyDialog}
                onClose={() => setOpenReadyDialog(false)}
                avatarId={user.avatarId}
                animationData={animationData}
                onPopUp={popUpNow}
                onBack={backToProfile}
                loading={loadingPopUp} />
            <PopUpSentDialog open={openPopUpSentDialog}
                onClose={() => { setOpenPopUpSentDialog(false); setOpenPopUpFromMobileDialog(true); }}
                streamerName={streamerName} />
            <PopUpAlreadySentDialog open={openAlreadySentDialog}
                onClose={() => { setOpenAlreadySentDialog(false); backToProfile(); }}
                streamerName={streamerName} />
            <NotASubDialog open={openNotASubDialog}
                onClose={() => { setOpenNotASubDialog(false); setOpenPopUpFromMobileDialog(true); }}
                streamerName={streamerName} />
            <StreamerOfflineDialog open={openStreamerOfflineDialog}
                onClose={() => { setOpenStreamerOfflineDialog(false); backToProfile(); }}
                streamerName={streamerName} />
            <PopUpFromMobileDialog open={openPopUpFromMobileDialog}
                onClose={() => { setOpenPopUpFromMobileDialog(false); backToProfile(); }} />
        </Container>
    );
}

export default GreetingTTSScreen;