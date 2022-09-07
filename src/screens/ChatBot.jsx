import React, { useState } from 'react';
import { Typography, Paper, InputBase, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ReactComponent as SendIcon } from '../assets/icons/SendIcon.svg';

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
    marginBottom: '16px',
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
});

const ChatBot = (props) => {
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSendButton = () => {
        setMessageSent(true);
    }

    return (<>
        <MediaSelectorContainer>
            <HeaderText>
                {`💬 Text-to-speech`}
            </HeaderText>
            <BottomContainer itemType='div'>
                <SenderChatBubble itemType='div'>
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
                {messageSent && <>
                    <UserChatBubble itemType='div'>
                        <ChatBubbleText>
                            {`${message}`}
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
                    <OptionButton>
                        <ChatBubbleText>
                            {`Google Translate`}
                        </ChatBubbleText>
                    </OptionButton>
                </>}
                {!messageSent &&
                    <SkipButton>
                        <SkipButtonText>
                            {`Skip`}
                        </SkipButtonText>
                    </SkipButton>
                }
                {!messageSent &&
                    <ChatInputExternalContainer itemType='div'>
                        <ChatInputContainer itemType='div'>
                            <ChatInput value={message} onChange={handleMessageChange} />
                        </ChatInputContainer>
                        <SendIconContainer itemType='div'>
                            <SendIcon onClick={handleSendButton} />
                        </SendIconContainer>
                    </ChatInputExternalContainer>
                }
            </BottomContainer>
        </MediaSelectorContainer>
    </>);
}

export default ChatBot;