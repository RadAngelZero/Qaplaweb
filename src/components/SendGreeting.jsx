import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

import { getRandomAvatarAnimationGif } from '../services/database';

const Container = styled(Box)((props) => ({
    backgroundImage: `url('${props.gif}')`,
    width: '343px',
    height: '396px',
    borderRadius: '25px',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '44px 55px',
    webkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    mozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',         /* Opera/IE 8+ */
}));

const Title = styled(Typography)({
    fontSize: '20px',
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: '1px',
    textAlign: 'center'
});

const Description = styled(Typography)({
    fontSize: '15px',
    fontWeight: '500',
    color: '#FFF',
    letterSpacing: '1px',
    lineHeight: '17px',
    textAlign: 'center'
});

const PopUpButton = styled(Button)({
    marginTop: 16,
    padding: '12px 26px',
    background: '#3B4BF9',
    borderRadius: '100px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '22px',
    letterSpacing: -.41,
    color: '#FFF',
    '&:hover': {
        opacity: .9,
        background: '#3B4BF9'
    }
});

const SendGreeting = ({ onClick }) => {
    const [gifUrl, setGifUrl] = useState('');

    useEffect(() => {
        async function getGif() {
            const gif = await getRandomAvatarAnimationGif();
            setGifUrl(gif.val());
        }

        getGif();
    }, []);

    return (
        <Container gif={gifUrl}>
            <Title>
                Show up with style 👋
            </Title>
            <Description>
                using your custom animated avi
            </Description>
            <PopUpButton onClick={onClick}>
                Pop up on stream
            </PopUpButton>
        </Container>
    );
}

export default SendGreeting;