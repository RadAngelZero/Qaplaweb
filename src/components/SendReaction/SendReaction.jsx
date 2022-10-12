import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Checkbox, Dialog, FormControlLabel, FormGroup, Typography, useMediaQuery, Box } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import SendReactionBackground from '../../assets/SendReactionBackground.png'
import { getReactionModuleGifs } from '../../services/database';

const Container = styled(Box)({
    display: 'flex',
    width: '340px',
    height: '190px',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundImage: `url("${SendReactionBackground}")`,
    background: SendReactionBackground,
    paddingLeft: '24px',
    alignItems: 'center',
    webkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    mozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',         /* Opera/IE 8+ */
})

const LeftContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const RightContainer = styled(Box)({
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    height: '100%',
    alignItems: 'center',
})

const TitleContainer = styled(Box)({
    display: 'flex',
})

const Title = styled(Typography)({
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '24px',
    letterSpacing: '1px',
    color: '#fff',
})

const AccentColorTitle = styled(Typography)({
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '24px',
    letterSpacing: '1px',
    marginLeft: '6px',
    color: '#00FFDD',
})

const SubTitle = styled(Typography)({
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    letterSpacing: '0px',
    color: '#fff',
    maxWidth: '135px',
})

const SendButton = styled(Button)({
    backgroundColor: '#00FEDF',
    borderRadius: '100px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '17px',
    letterSpacing: '0px',
    color: '#0D1021',
    textTransform: 'none',
    height: '46px',
    marginTop: '16px',
    width: '150px',
    '&:hover': {
        backgroundColor: '#00FEDFCC',
    }
});

const GifRender = styled(Box)({
    display: 'flex',
    flex: 1,
    width: '60%',
    height: '60%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
})

const SendReaction = ({ open, onClose, uid, email, streamerUid, reactionId }) => {
    const [textRotator, setTextRotator] = useState('Meme');
    const [gif, setGif] = useState(null);

    useEffect(() => {
        async function getGifs() {
            const dbGifs = await getReactionModuleGifs();

            if (dbGifs.exists()) {
                let gifs = dbGifs.val();
                let random = Math.floor(Math.random() * gifs.length);
                setGif(dbGifs.val()[random].url);
            }
        }

        if (!gif) {
            getGifs();
        }
    }, [gif]);

    return (<Container >
        <LeftContainer>
            <TitleContainer>
                <Title>Send</Title>
                <AccentColorTitle>{`${textRotator}`}</AccentColorTitle>
            </TitleContainer>
            <SubTitle>
                on stream using your
                channel points
            </SubTitle>
            <SendButton>
                Send Reaction
            </SendButton>
        </LeftContainer>
        <RightContainer>
            <GifRender style={{
                backgroundImage: `url('${gif}')`,
            }} />
        </RightContainer>
    </Container>)
}

export default SendReaction;