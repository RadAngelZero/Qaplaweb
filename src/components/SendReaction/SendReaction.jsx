import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '22px',
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

const SendReaction = ({ streamerUid }) => {
    const [textRotator, setTextRotator] = useState('Memes');
    const [gif, setGif] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

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

    const navigateToSendReaction = () => {
        localStorage.setItem('streamerUid', streamerUid);
        navigate('/react');
    }

    return (
        <Container>
            <LeftContainer>
                <TitleContainer>
                    <Title>
                        {t('SendReaction.send')}
                    </Title>
                    <AccentColorTitle>{`${textRotator}`}</AccentColorTitle>
                </TitleContainer>
                <SubTitle>
                    {t('SendReaction.sendDescription')}
                </SubTitle>
                <SendButton onClick={navigateToSendReaction}>
                    {t('SendReaction.sendReaction')}
                </SendButton>
            </LeftContainer>
            <RightContainer>
                <GifRender style={{
                    backgroundImage: `url('${gif}')`,
                }} />
            </RightContainer>
        </Container>
    );
}

export default SendReaction;