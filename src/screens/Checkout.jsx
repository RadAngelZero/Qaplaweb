import { useState, useEffect } from 'react';
import { AccordionSummary, Box, Button, Dialog, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { ReactComponent as GifIcon } from './../assets/icons/IconGIF.svg';
import { ReactComponent as StickerIcon } from './../assets/icons/Sticker.svg';
import { ReactComponent as MemesIcon } from './../assets/icons/Memes.svg';
import { ReactComponent as TTSIcon } from './../assets/icons/TTSIcon.svg';
import { ReactComponent as QoinIcon } from '../assets/icons/Qoin.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/Delete.svg';
import MakeItPop from '../assets/gifs/makeItPop.gif';
import GradientChat from '../assets/GradientChat.png';
import GradientLOL from '../assets/GradientLOL.png';
import CheerPreview from '../components/CheerPreview/CheerPreview';
import EmojiSelector from './EmojiSelector';
import MediaSelector from './MediaSelector';
import MemeMediaSelector from './MemeMediaSelector';
import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEMES } from '../utils/constants';
import { getReactionTypeCost, putReactionInQueue, sendPrepaidReaction } from '../services/database';
import PurchaseQoinsDialog from '../components/PurchaseQoinsDialog/PurchaseQoinsDialog';
import ReactionsDialog from '../components/ReactionsDialog/ReactionsDialog';

const PreviewContainer = styled(Paper)({
    backgroundColor: 'transparent',
    width: '100%'
});

const CheckoutContainer = styled(Paper)({
    flexDirection: 'column',
    backgroundColor: '#0D1021',
    width: '100%',
    height: '100vh',
    maxWidth: '835px',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box'
});

const SectionTitle = styled(Typography)({
    marginTop: 24,
    fontSize: 22,
    fontWeight: 600,
    color: '#FFF',
    marginBottom: 16
});

const AddOnButton = styled(Button)({
    textTransform: 'none',
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
    marginTop: 8,
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
    textTransform: 'none',
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
    textTransform: 'none',
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

const DeleteIconButton = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8
});

const Checkout = ({ user, media, setMediaSelected, giphyText, setGiphyText, botVoice, mediaType, message, donationCost, setCost, editMessage, streamer, setMessage, onSuccess }) => {
    const [openEmojiSelector, setOpenEmojiSelector] = useState(false);
    const [openMediaDialog, setOpenMediaDialog] = useState(false);
    const [openMemeMediaDialog, setOpenMemeMediaDialog] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [emojiRaidCost, setEmojiRaidCost] = useState(0);
    const [giphyTextCost, setGiphyTextCost] = useState(0);
    const [extraTip, setExtraTip] = useState(0);
    const [lockSendReactionButton, setLockSendReactionButton] = useState(false);
    const [localMediaType, setLocalMediaType] = useState(GIPHY_GIFS);
    const [openPurchaseQoinsDialog, setOpenPurchaseQoinsDialog] = useState(false);
    const [reactionId, setReactionId] = useState('');
    const [reactionSent, setReactionSent] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    useEffect(() => {
        async function getCosts() {
            const emojiRaidCost = await getReactionTypeCost('emoji');
            if (emojiRaidCost.exists()) {
                setEmojiRaidCost(emojiRaidCost.val());
            }

            const giphyTextCost = await getReactionTypeCost(GIPHY_TEXT);
            if (giphyTextCost.exists()) {
                setGiphyTextCost(giphyTextCost.val() * .5);
            }
        }

        if (!emojiRaidCost && !giphyTextCost) {
            getCosts();
        }
    }, [emojiRaidCost, giphyTextCost]);

    const onEmojiSelected = (selectedEmoji) => {
        // Only add to cost the first time an emoji is selected
        if (!emoji) {
            setCost(emojiRaidCost);
        }
        setEmoji(selectedEmoji.native);
        setOpenEmojiSelector(false);
    }

    const openMediaSelector = (mediaType) => {
        setLocalMediaType(mediaType);
        if (mediaType !== MEMES) {
            setOpenMediaDialog(true);
        } else {
            setOpenMemeMediaDialog(true);
        }
    }

    const onMediaSelected = (media) => {
        if (media.type === GIPHY_TEXT || media.type === 'text') {
            if (!giphyText) {
                setCost(giphyTextCost);
            }
            setGiphyText(media);
        } else {
            setMediaSelected(media);
        }
        setOpenMediaDialog(false);
        setOpenMemeMediaDialog(false);
    }

    const setOtherExtraTip = () => {
        const extraTip = Number(prompt('Extra tip:'));
        if (!isNaN(extraTip) && extraTip >= 0) {
            setExtraTip(extraTip);
        } else {
            alert('Invalid tip');
        }
    }

    const sendReaction = () => {
        setLockSendReactionButton(true);
        const totalDonationCost = donationCost + extraTip;
        if (user.credits >= totalDonationCost) {
            sendPrepaidReaction(
                user.id,
                user.userName,
                user.twitchUsername,
                user.photoUrl,
                streamer.uid,
                streamer.displayName,
                media ? {
                    id: media.id ? media.id : null,
                    type: mediaType,
                    ...media.images.original
                } : null,
                message,
                {
                    giphyText,
                    ...botVoice
                },
                emoji ? [emoji] : [],
                totalDonationCost,
                () => { setReactionSent(true); },
                () => alert('Error')
            );
        } else {
            openPurchaseDialogAndSaveDonation();
            setLockSendReactionButton(false);
        }
    }

    const removeEmojiRaid = (e) => {
        e.stopPropagation();
        setEmoji('');
        setCost(-1 * emojiRaidCost);
    }

    const removeGiphyText = (e) => {
        e.stopPropagation();
        setGiphyText(null);
        setCost(-1 * giphyTextCost);
    }

    const renderMediaIcon = () => {
        switch (mediaType) {
            case GIPHY_GIFS:
                return <GifIcon width={50} height={50} />;
            case GIPHY_STICKERS:
                return <StickerIcon width={50} height={50} />;
            case MEMES:
                return <MemesIcon width={50} height={50} />;
            default:
                break;
        }
    }

    const openPurchaseDialogAndSaveDonation = () => {
        const reactionRef = putReactionInQueue(user.id, streamer.uid, {
            amountQoins: donationCost + extraTip,
            message,
            timestamp: (new Date()).getTime(),
            uid: user.id,
            read: false,
            twitchUserName: user.twitchUsername,
            emojiRain: {
                emojis: emoji ? [emoji] : []
            },
            media: media ? {
                id: media.id ? media.id : null,
                type: mediaType,
                ...media.images.original
            } : null,
            messageExtraData: {
                giphyText,
                ...botVoice
            },
            userName: user.userName,
            photoURL: user.photoUrl
        });

        setReactionId(reactionRef.key);
        setOpenPurchaseQoinsDialog(true);
    }

    return (
        <CheckoutContainer>
            <PreviewContainer>
                <CheerPreview donation={{
                    amountQoins: donationCost + extraTip,
                    message,
                    timestamp: (new Date()).getTime(),
                    uid: user.id,
                    read: false,
                    twitchUserName: user.twitchUsername,
                    emojiRain: {
                        emojis: emoji ? [emoji] : []
                    },
                    media: media ? {
                        id: media.id ? media.id : null,
                        type: mediaType,
                        ...media.images.original
                    } : null,
                    messageExtraData: {
                        giphyText,
                        ...botVoice
                    },
                    userName: user.userName,
                    photoURL: user.photoUrl
                }} />
            </PreviewContainer>
            <Grid container>
                {((media && mediaType !== GIPHY_CLIPS) || (!giphyText && mediaType !== GIPHY_CLIPS)) &&
                    <>
                    <Grid item xs={12}>
                        <SectionTitle>
                            Add Ons
                        </SectionTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={2}>
                            {emojiRaidCost &&
                                <Grid item md={3}>
                                    <AddOnButton style={{ background: !emoji ? `url(${GradientChat})` : 'linear-gradient(121.21deg, #2D07FA 0%, #A716EE 100%), #141539' }}
                                        onClick={() => setOpenEmojiSelector(true)}>
                                        {emoji !== '' &&
                                            <DeleteIconButton onClick={removeEmojiRaid}>
                                                <DeleteIcon width={16} height={16} />
                                            </DeleteIconButton>
                                        }
                                        <div style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                            {emoji || '🤡'}
                                        </div>
                                        <AddOnText style={{ color: !emoji ? '#0D1021' : '#FFF' }}>
                                            Emoji Raid
                                        </AddOnText>
                                        <QoinsCostContainer>
                                            <div style={{ display: 'flex', marginLeft: 14, alignSelf: 'center' }}>
                                                <QoinIcon />
                                            </div>
                                            <QoinsCostText>
                                                {emojiRaidCost}
                                            </QoinsCostText>
                                        </QoinsCostContainer>
                                    </AddOnButton>
                                </Grid>
                            }
                            <Grid item md={3}>
                                <AddOnButton style={{ background: !giphyText ? `url(${GradientLOL})` : 'linear-gradient(121.21deg, #2D07FA 0%, #A716EE 100%), #141539' }}
                                    onClick={() => openMediaSelector(GIPHY_TEXT)}>
                                    {giphyText &&
                                        <DeleteIconButton onClick={removeGiphyText}>
                                            <DeleteIcon width={16} height={16} />
                                        </DeleteIconButton>
                                    }
                                    <div style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                        <img src={MakeItPop} style={{ height: 75, width: 150 }} />
                                    </div>
                                    <AddOnText style={{ color: !giphyText ? '#0D1021' : '#FFF' }}>
                                        {t('Checkout.customTTS')}
                                    </AddOnText>
                                    <QoinsCostContainer>
                                        <div style={{ display: 'flex', marginLeft: 14, alignSelf: 'center' }}>
                                            <QoinIcon />
                                        </div>
                                        <QoinsCostText>
                                            {giphyTextCost}
                                        </QoinsCostText>
                                    </QoinsCostContainer>
                                </AddOnButton>
                            </Grid>
                            {media &&
                                <Grid item md={3}>
                                    <EditButton onClick={() => openMediaSelector(mediaType)}>
                                        <div>
                                            {renderMediaIcon()}
                                        </div>
                                        <p style={{ weight: "700", fontSize: "18px", margin: 0 }}>
                                            {t(`Checkout.edit.${mediaType}`)}
                                        </p>
                                    </EditButton>
                                </Grid>
                            }
                            {message !== '' &&
                                <Grid item md={3}>
                                    <EditButton onClick={editMessage}>
                                        <div>
                                            <TTSIcon />
                                        </div>
                                        <p style={{ weight: "700", fontSize: "18px", margin: 0 }}>
                                            {t('Checkout.edit.tts')}
                                        </p>
                                    </EditButton>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    </>
                }
                <Grid item sm={8} md={6}>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                    </Grid>
                    <Grid item xs={12}>
                        <SectionTitle>
                            {t('Checkout.sendTip')}
                        </SectionTitle>
                    </Grid>
                    <Grid item xs={12} style={{ justifyContent: 'space-between' }}>
                        <ExtraTipContainer onClick={() => setExtraTip(200)}
                            style={{ background: extraTip === 200 ? 'linear-gradient(118.67deg, #2D07FA -6.39%, #A716EE 101.45%), #141539' : '#141539' }}>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            200
                        </ExtraTipContainer>
                        <ExtraTipContainer onClick={() => setExtraTip(500)}
                            style={{ background: extraTip === 500 ? 'linear-gradient(118.67deg, #2D07FA -6.39%, #A716EE 101.45%), #141539' : '#141539' }}>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            500
                        </ExtraTipContainer>
                        <ExtraTipContainer onClick={() => setExtraTip(1000)}
                            style={{ background: extraTip === 1000 ? 'linear-gradient(118.67deg, #2D07FA -6.39%, #A716EE 101.45%), #141539' : '#141539' }}>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            1000
                        </ExtraTipContainer>
                        <ExtraTipContainer onClick={setOtherExtraTip}
                            style={{ marginRight: 0, background: extraTip > 0 && extraTip !== 200 && extraTip !== 500 && extraTip !== 1000 ? 'linear-gradient(118.67deg, #2D07FA -6.39%, #A716EE 101.45%), #141539' : '#141539' }}>
                            <div style={{ display: 'flex', alignSelf: 'center', marginRight: 6 }}>
                                <QoinIcon />
                            </div>
                            {t('Checkout.other')}
                        </ExtraTipContainer>
                    </Grid>
                </Grid>
                <Grid item sm={8} md={6} style={{ paddingLeft: 20 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            {/* This must be an accordion */}
                            <TotalAccordion>
                                <AccordionSummary style={{ height: 80, padding: 0, cursor: 'default' }}>
                                    <TotalText>
                                        Total
                                    </TotalText>
                                    <TotalText style={{ textAlign: 'end' }}>
                                        {donationCost + extraTip}
                                    </TotalText>
                                </AccordionSummary>
                            </TotalAccordion>
                            <SendButton disabled={lockSendReactionButton}
                                onClick={sendReaction}>
                                <SendButtonText>
                                    {t('Checkout.sendReaction')}
                                </SendButtonText>
                            </SendButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <PurchaseQoinsDialog open={openPurchaseQoinsDialog}
                onClose={() => setOpenPurchaseQoinsDialog(false)}
                reactionId={reactionId}
                uid={user.id}
                email={user.email}
                streamerUid={streamer.uid} />
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
                <MediaSelector onMediaSelected={onMediaSelected} mediaType={localMediaType} setMessage={setMessage} />
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
            <ReactionsDialog open={reactionSent}
                onClose={() => { setReactionSent(false); onSuccess(); setLockSendReactionButton(false); }} />
        </CheckoutContainer>
    );
}

export default Checkout;