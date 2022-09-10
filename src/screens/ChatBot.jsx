import React, { useState } from 'react';
import { Typography, Paper, InputBase, Box, Button, Dialog } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ReactComponent as SendIcon } from '../assets/icons/SendIcon.svg';
import { ReactComponent as QoinIcon } from './../assets/icons/Qoin.svg';
import { ReactComponent as GifIcon } from './../assets/icons/IconGIF.svg';
import { ReactComponent as StickerIcon } from './../assets/icons/Sticker.svg';
import { ReactComponent as MemesIcon } from './../assets/icons/Memes.svg';
import { getBotVoices } from '../services/database';
import MediaSelector from './MediaSelector';
import MemeMediaSelector from './MemeMediaSelector';
import { GIPHY_GIFS, GIPHY_STICKERS, MEMES } from '../utils/constants';

const MediaSelectorContainer = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#0D1021',
    padding: '16px',
    borderRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    width: '100%',
    height: '100vh',
    maxWidth: '835px',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
});

const HeaderText = styled(Typography)({
    color: '#fff',
    fontSize: '22px',
    fontWeight: '500',
    lineHeight: '24px',
    marginBottom: 24
});

const BottomContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    marginTop: 'auto',
    bottom: '0px',
    flexDirection: 'column',
});

const ChatInputExternalContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#141539',
    padding: '16px 40px',
    marginBottom: '-16px',
});

const ChatInputContainer = styled(Paper)({
    // zIndex: 1000,
    flex: 1,
    display: 'flex',
    // alignItems: 'center',
    backgroundColor: '#0D1021',
    height: '38px',
    padding: '0px 16px',
    borderRadius: '50px',
    minWidth: '260px',
});

const SkipButton = styled(Button)({
    backgroundColor: '#4040FF4F',
    borderRadius: '20.5px',
    padding: '9.6px 24px',
    alignSelf: 'flex-start',
    marginBottom: '40px',
    '&:hover': {
        backgroundColor: '#4040FF4F',
        opacity: 0.9
    }
});

const SkipButtonText = styled(Typography)({
    color: '#FFFFFFA6',
    fontSize: '17px',
    fontWeight: '600',
    lineHeight: '22px',
    letterSpacing: '0.492000013589859px',
    textTransform: 'none',
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
});

const SenderChatBubble = styled(Box)({
    backgroundColor: '#141539',
    padding: '16px 24px',
    borderRadius: '4px 20px 20px 20px',
    alignSelf: 'flex-start',
    display: 'flex',
});

const UserChatBubble = styled(Box)({
    backgroundColor: '#3D42DF',
    padding: '16px 24px',
    borderRadius: '20px 4px 20px 20px',
    alignSelf: 'flex-end',
    marginBottom: '16px',
    display: 'flex',
});

const ChatBubbleText = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
});

const ChatBubbleTextAccent = styled(Typography)({
    color: '#00FFDD',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
    margin: '0px 6px',
});

const OptionButton = styled(Button)({
    backgroundColor: '#0000',
    border: '2px solid',
    color: '#FF9BB3',
    pading: '2px',
    borderRadius: '20px',
    alignSelf: 'flex-end',
    textTransform: 'none',
    padding: '16px 24px',
    marginTop: 16
});

const VoiceCost = styled(Typography)({
    background: 'linear-gradient(227.05deg, #FFD3FB 9.95%, #F5FFCB 48.86%, #9FFFDD 90.28%), #FFFFFF',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '0px',
    marginLeft: 32,
    display: 'flex',
    alignItems: 'center'
});

const ConfirmationButton = styled(Button)({
    backgroundColor: '#00FFDD',
    border: '2px solid',
    color: '#0D1021',
    pading: '2px',
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

const ChatBot = ({ message, setMessage, setBotVoice, mediaSelected, setMediaSelected, mediaType, setMediaType, setCost, onSuccess }) => {
    const [localMessage, setLocalMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const [availabeVoices, setAvailabeVoices] = useState({});
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [openMediaDialog, setOpenMediaDialog] = useState(false);
    const [openMemeMediaDialog, setOpenMemeMediaDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleMessageChange = (e) => {
        setLocalMessage(e.target.value);
    }

    const handleSendButton = async (e) => {
        if (e.type === 'click' || e.key === 'Enter') {
            setMessageSent(true);
            const voices = await getBotVoices();
            if (voices.exists()) {
                setAvailabeVoices(voices.val());
            }
        }
    }

    const openMediaSelector = (mediaType) => {
        if (mediaType !== MEMES) {
            setOpenMediaDialog(true);
        } else {
            setOpenMemeMediaDialog(true);
        }

        setMediaType(mediaType);
    }

    const onMediaSelected = (media) => {
        setMediaSelected(media);
        setOpenMediaDialog(false);
        setOpenMemeMediaDialog(false);
        sendTTS();
    }

    const onVoiceSelected = (voice) => {
        setSelectedVoice(voice);
        if (mediaSelected) {
            sendTTS(null, voice);
        }
    }

    const sendTTS = (e, voice) => {
        const choosenVoice = voice ? voice : selectedVoice;
        setMessage(localMessage);
        setBotVoice(choosenVoice);
        if (choosenVoice.cost) {
            setCost(choosenVoice.cost);
        }
        onSuccess();
    }

    return (
        <>
        <MediaSelectorContainer>
            <HeaderText>
                {`💬 Text-to-speech`}
            </HeaderText>
            <BottomContainer itemType='div'>
                <SenderChatBubble itemType='div' style={{ marginBottom: !message && mediaSelected ? 16 : 40 }}>
                    <ChatBubbleText>
                        {`🗣 `}
                    </ChatBubbleText>
                    <ChatBubbleTextAccent>
                        {` Speak your mind! `}
                    </ChatBubbleTextAccent>
                    <ChatBubbleText>
                        {` What do you want to say?`}
                    </ChatBubbleText>
                </SenderChatBubble>
                {messageSent &&
                    <>
                    <UserChatBubble itemType='div'>
                        <ChatBubbleText>
                            {localMessage}
                        </ChatBubbleText>
                    </UserChatBubble>
                    <SenderChatBubble style={{ flexDirection: 'column' }}>
                        <ChatBubbleText>
                            {`🔥 Slaaay`}
                        </ChatBubbleText>
                        <ChatBubbleText>
                            {`🤖 Now choose a bot voice:`}
                        </ChatBubbleText>
                    </SenderChatBubble>
                    {!selectedVoice ?
                        Object.keys(availabeVoices).sort((a, b) => availabeVoices[a].cost - availabeVoices[b].cost).map((voiceKey) => (
                            <OptionButton key={voiceKey} onClick={() => onVoiceSelected({ voiceName: voiceKey, ...availabeVoices[voiceKey] })}>
                                <ChatBubbleText>
                                    {voiceKey}
                                </ChatBubbleText>
                                {availabeVoices[voiceKey].cost > 0 &&
                                    <VoiceCost>
                                        <QoinIcon style={{ marginRight: 4, alignSelf: 'center' }} />
                                        {availabeVoices[voiceKey].cost}
                                    </VoiceCost>
                                }
                            </OptionButton>
                        ))
                        :
                        <>
                        <UserChatBubble itemType='div'>
                            <ChatBubbleText>
                                {selectedVoice.voiceName}
                            </ChatBubbleText>
                        </UserChatBubble>
                        {!mediaSelected &&
                            <>
                            <SenderChatBubble style={{ flexDirection: 'column' }}>
                                <ChatBubbleText>
                                    {`👌 Want to add some fun media to your TTS?`}
                                </ChatBubbleText>
                            </SenderChatBubble>
                            <OptionButton onClick={() => openMediaSelector(GIPHY_GIFS)}>
                                <GifIcon width={24} height={24} style={{ marginRight: 16 }} />
                                <ChatBubbleText>
                                    Add GIF to my TTS
                                </ChatBubbleText>
                            </OptionButton>
                            <OptionButton onClick={() => openMediaSelector(GIPHY_STICKERS)}>
                                <StickerIcon width={24} height={24} style={{ marginRight: 16 }} />
                                <ChatBubbleText>
                                    Add Sticker to my TTS
                                </ChatBubbleText>
                            </OptionButton>
                            <OptionButton onClick={() => openMediaSelector(MEMES)}>
                                <MemesIcon width={24} height={24} style={{ marginRight: 16 }} />
                                <ChatBubbleText>
                                    Add Meme to my TTS
                                </ChatBubbleText>
                            </OptionButton>
                            <ConfirmationButton onClick={sendTTS}>
                                Only Send TTS
                            </ConfirmationButton>
                            </>
                        }
                        </>
                    }
                    </>
                }
                {!message && !messageSent && mediaSelected &&
                    <SkipButton onClick={onSuccess}>
                        <SkipButtonText>
                            {`Skip`}
                        </SkipButtonText>
                    </SkipButton>
                }
                {!messageSent &&
                    <ChatInputExternalContainer itemType='div'>
                        <ChatInputContainer itemType='div'>
                            <ChatInput autoFocus
                                value={localMessage}
                                onChange={handleMessageChange}
                                onKeyPress={handleSendButton}
                                inputProps={{
                                    maxLength: 100
                                }} />
                        </ChatInputContainer>
                        <SendIconContainer itemType='div'>
                            <SendIcon onClick={handleSendButton} />
                        </SendIconContainer>
                    </ChatInputExternalContainer>
                }
            </BottomContainer>
        </MediaSelectorContainer>
        <Dialog open={openMediaDialog}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent'
                }
            }}
            onClose={() => setOpenMediaDialog(false)}
            fullWidth
            fullScreen={fullScreen}
            maxWidth='sm'>
            <MediaSelector onMediaSelected={onMediaSelected} mediaType={mediaType} />
        </Dialog>
        <Dialog open={openMemeMediaDialog}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent'
                }
            }}
            onClose={() => setOpenMemeMediaDialog(false)}
            fullWidth
            fullScreen={fullScreen}
            maxWidth='sm'>
            <MemeMediaSelector onMediaSelected={onMediaSelected} />
        </Dialog>
        </>
    );
}

export default ChatBot;