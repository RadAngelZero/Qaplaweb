import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, IconButton, Typography } from '@mui/material';

import { ReactComponent as CloseIcon } from './../assets/icons/CloseIcon.svg';
import { getRandomStreamerOfflineGif } from '../services/database';

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 16,
    right: 16
});

const GifContainer = styled('img')({
    height: '118px',
    width: '215px',
    objectFit: 'cover'
});

const Title = styled(Typography)({
    marginTop: '32px',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: -.72,
    textAlign: 'center',
    color: '#FFF'
});

const Description = styled(Typography)({
    marginTop: '32px',
    fontSize: '16px',
    lineHeight: '19.09px',
    letterSpacing: .25,
    textAlign: 'center',
    color: '#FFF'
});

const TextAccent = styled('span')({
    color: '#00FFDF'
});

const GoToStreamButton = styled(Button)({
    marginTop: '32px',
    background: '#3B4BF9',
    borderRadius: '40px',
    paddingTop: '26px',
    paddingBottom: '26px',
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: .49,
    color: '#FFF',
    width: '100%',
    '&:hover': {
        opacity: .9,
        background: '#3B4BF9'
    }
});

const StreamerOfflineDialog = ({ open, onClose, streamerName }) => {
    const [gifUrl, setGifUrl] = useState('');

    useEffect(() => {
        async function getGif() {
            const gif = await getRandomStreamerOfflineGif();
            setGifUrl(gif.val());
        }

        getGif();
    }, []);

    return (
        <Dialog open={open}
            sx={{
                background: 'transparent',
                backdropFilter: 'blur(50px)'
            }}
            PaperProps={{
                style: {
                    backgroundColor: '#141539',
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'256px',
                    padding: '56px'
                }
            }}
            onClose={onClose}>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            <GifContainer src={gifUrl} alt='Streamer offline gif' />
            <Title>
                Streamer  offline 🙃
            </Title>
            <Description>
                We’ll notify you when <TextAccent>{streamerName}</TextAccent> next stream it’s going to be 👇
            </Description>
            <GoToStreamButton onClick={() => window.open('https://qapla.app.link/download', '_blank')}>
                Download app
            </GoToStreamButton>
        </Dialog>
    );
}

export default StreamerOfflineDialog;