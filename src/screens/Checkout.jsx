import { useState, useEffect } from 'react';
import { AccordionSummary, Box, Button, Dialog, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Video } from '@giphy/react-components';

import { ReactComponent as IconGIF } from '../assets/IconGIF.svg';
import { ReactComponent as QoinIcon } from '../assets/icons/Qoin.svg';
import IconChat from '../assets/iconChat.png';
import GradientChat from '../assets/GradientChat.png';
import GradientLOL from '../assets/GradientLOL.png';
import CheerPreview from '../components/CheerPreview/CheerPreview';
import EmojiSelector from './EmojiSelector';
import MediaSelector from './MediaSelector';
import MemeMediaSelector from './MemeMediaSelector';
import { GIPHY_TEXT, MEMES } from '../utils/constants';

const gf = new GiphyFetch('Kb3qFoEloWmqsI3ViTJKGkQZjxICJ3bi');

const PreviewContainer = styled(Paper)({
    backgroundColor: '#141539',
    width: '100%',
    borderRadius: 20
});

const CheckoutContainer = styled(Paper)({
    flex: 1,
    padding: 40,
    backgroundColor: '#0D1021',
    maxWidth: '835px',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
});

const SectionTitle = styled(Typography)({
    marginTop: 24,
    fontSize: 22,
    fontWeight: 600,
    color: '#FFF',
    marginBottom: 16
});

const AddOnButton = styled(Button)({
    width: 167,
    height: 130,
    borderRadius: 20,
    flexDirection: 'column',
    color: '#0D1021',
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8
});

const QoinsCostContainer = styled(Box)({
    marginTop: 16,
    background: "#141833",
    maxHeight: 30,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.35)'
});

const QoinsCostText = styled(Typography)({
    weight: "600",
    fontSize: "18px",
    color: '#FFF',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 14
});

const EditButton = styled(Button)({
    width: 167,
    height: 130,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#141539',
    color: '#FFF'
});

const AddOnText = styled(Typography)({
    fontSize: 12,
    fontWeight: '700'
});

const ExtraTipContainer = styled(Button)({
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    width: 80,
    height: 80,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#141539',
    borderRadius: 20,
    marginRight: 16,
    marginBottom: 16,
    textTransform: 'none'
});

const TotalAccordion = styled(Box)({
    borderRadius: 20,
    marginTop: 73,
    height: 80,
    backgroundColor: '#141539',
});

const TotalText = styled(Typography)({
    fontSize: 18,
    fontWeight: '800',
    width: '50%',
    background: 'linear-gradient(227.05deg, #FFD3DB 9.95%, #F5FFCB 48.86%, #9FFFDD 90.28%), linear-gradient(222.55deg, #FFF394 35.86%, #A46CFF 85.37%), linear-gradient(0deg, #E3E3E3, #E3E3E3), #940DFF',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingLeft: 24,
    paddingRight: 32
});

const SendButton = styled(Button)({
    marginTop: 24,
    borderRadius: 16,
    background: '#00FFDD',
    boxShadow: '0px 20px 40px -10px rgba(0, 255, 221, 0.35)',
    width: '100%',
    '&:hover': {
        background: "#00FFDD",
        opacity: 0.9
    }
});

const SendButtonText = styled(Typography)({
    marginTop: 18,
    marginBottom: 18,
    color: '#141833',
    fontSize: 16,
    fontWeight: 600
});

const Checkout = ({ media, setMediaSelected, giphyText, setGiphyText, mediaType, setMediaType }) => {
    const [clip, setClip] = useState(null);
    const [openEmojiSelector, setOpenEmojiSelector] = useState(false);
    const [openMediaDialog, setOpenMediaDialog] = useState(false);
    const [openMemeMediaDialog, setOpenMemeMediaDialog] = useState(false);
    const [emoji, setEmoji] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const getClip = async () => {
            const { data } = await gf.gif('zAfuVgdHlEjS6gX6Aj');
            setClip(data);
        }

        if (!clip) {
            getClip();
        }
    }, [clip]);

    const onEmojiSelected = (emoji) => {
        setEmoji(emoji.native);
        setOpenEmojiSelector(false);
    }

    const openMediaSelector = (mediaType) => {
        setMediaType(mediaType);
        if (mediaType !== MEMES) {
            setOpenMediaDialog(true);
        } else {
            setOpenMemeMediaDialog(true);
        }
    }

    const onMediaSelected = (media) => {
        if (media.type == GIPHY_TEXT || media.type === 'text') {
            setGiphyText(media);
        } else {
            setMediaSelected(media);
        }
        setOpenMediaDialog(false);
        setOpenMemeMediaDialog(false);
    }

    return (
        <CheckoutContainer>
            <PreviewContainer>
                <CheerPreview donation={{
                    amountQoins: 1000,
                    message: 'Test',
                    timestamp: (new Date()).getTime(),
                    uid: '',
                    read: false,
                    twitchUserName: 'QAPLA',
                    emojiRain: {
                        emojis: ['👋']
                    },
                    media,
                    messageExtraData: {
                        voiceAPIName: 'pt-BR-Standard-B',
                        giphyText
                    },
                    userName: 'QAPLA',
                    photoURL: ''
                }} />
            </PreviewContainer>
            <Grid container>
                <Grid xs={12}>
                    <SectionTitle>
                        Add Ons
                    </SectionTitle>
                </Grid>
                <Grid xs={12}>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                        <AddOnButton style={{ background: `url(${GradientChat})` }} onClick={() => setOpenEmojiSelector(true)}>
                            <div>
                                {emoji || '🤡'}
                            </div>
                            <AddOnText>
                                Emoji Raid
                            </AddOnText>
                            <QoinsCostContainer>
                                <div style={{ display: 'flex', marginLeft: 14, alignSelf: 'center' }}>
                                    <QoinIcon />
                                </div>
                                <QoinsCostText>
                                    200
                                </QoinsCostText>
                            </QoinsCostContainer>
                        </AddOnButton>
                        <AddOnButton style={{ background: `url(${GradientLOL})` }} onClick={() => openMediaSelector(GIPHY_TEXT)}>
                            <div>
                                🤡
                            </div>
                            <AddOnText>
                                TTS personalizado
                            </AddOnText>
                            <QoinsCostContainer>
                                <div style={{ display: 'flex', marginLeft: 14, alignSelf: 'center' }}>
                                    <QoinIcon />
                                </div>
                                <QoinsCostText>
                                    200
                                </QoinsCostText>
                            </QoinsCostContainer>
                        </AddOnButton>
                        <EditButton onClick={() => openMediaSelector(mediaType)}>
                            <div>
                                <IconGIF />
                            </div>
                            <p style={{ weight: "700", fontSize: "18px", margin: 0 }}>
                                Edit GIF
                            </p>
                        </EditButton>
                        <EditButton>
                            <div>
                                <img src={IconChat} alt="Chat" />
                            </div>
                            <p style={{ weight: "700", fontSize: "18px", margin: 0 }}>
                                Edit TTS
                            </p>
                        </EditButton>
                    </Grid>
                </Grid>
                <Grid item sm={8} md={6}>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                    </Grid>
                    <Grid xs={12}>
                        <SectionTitle>
                            Send Extra Tip
                        </SectionTitle>
                    </Grid>
                    <Grid xs={12} style={{ justifyContent: 'space-between' }}>
                        <ExtraTipContainer>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            200
                        </ExtraTipContainer>
                        <ExtraTipContainer>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            500
                        </ExtraTipContainer>
                        <ExtraTipContainer>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            1000
                        </ExtraTipContainer>
                        <ExtraTipContainer style={{ marginRight: 0 }}>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            Other
                        </ExtraTipContainer>
                    </Grid>
                </Grid>
                <Grid item sm={8} md={6} style={{ paddingLeft: 20 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            {/* This must be an accordion */}
                            <TotalAccordion>
                                <AccordionSummary style={{ height: 80, padding: 0 }}>
                                    <TotalText>
                                        Total
                                    </TotalText>
                                    <TotalText style={{ textAlign: 'end' }}>
                                        0
                                    </TotalText>
                                </AccordionSummary>
                            </TotalAccordion>
                            <SendButton>
                                <SendButtonText>
                                    Send Reaction
                                </SendButtonText>
                            </SendButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <EmojiSelector open={openEmojiSelector}
                onEmojiSelected={onEmojiSelected}
                onClose={() => setOpenEmojiSelector(false)} />
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
        </CheckoutContainer>
    );
}

export default Checkout;