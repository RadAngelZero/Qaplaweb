import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import DeQButton from "../components/DeQButton/DeQButton";
import DeQButtonPayments from "../components/DeQButtonPayments/DeQButtonPayments";
import iconEstrella from "../assets/IconEstrella.png";
import ellipse from "../assets/Ellipse.png";
import { ReactComponent as MemesIcon } from '../assets/icons/Memes.svg';
import { ReactComponent as TTSIcon } from '../assets/icons/TTSIcon.svg';
import { ReactComponent as GifIcon } from '../assets/icons/IconGIF.svg';
import { ReactComponent as StickerIcon } from '../assets/icons/Sticker.svg';
import gradientGifs from '../assets/GradientGifs.png';
import gradientChat from '../assets/GradientChat.png';
import gradientLOL from '../assets/GradientLOL.png';
import gradientSticker from '../assets/GradientSticker.png';
import { getReactionSample, getReactionsSamplesCount } from "../services/database";
import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEMES } from "../utils/constants";
import MediaSelector from "./MediaSelector";
import MemeMediaSelector from "./MemeMediaSelector";
import {Title} from '../components/DeQButtonPayments/DeQButtonPayments';

const Layout = ({ user, streamer, setMediaSelected, setMediaType, setGiphyText, onSuccess, setCost, setMessage, costs, numberOfReactions }) => {
    const [clipsSample, setClipsSample] = useState(null);
    const [customTTSSample, setCustomTTSSample] = useState(null);
    const [openMediaDialog, setOpenMediaDialog] = useState(false);
    const [openMemeMediaDialog, setOpenMemeMediaDialog] = useState(false);
    const [localMediaType, setLocalMediaType] = useState(GIPHY_GIFS);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    useEffect(() => {
        async function getReactionsSample() {
            const clipsLength = await getReactionsSamplesCount(GIPHY_CLIPS);
            let index = Math.floor(Math.random() * clipsLength.val());
            const clipsSample = await getReactionSample(GIPHY_CLIPS, index);
            setClipsSample(clipsSample.val());

            const textLength = await getReactionsSamplesCount(GIPHY_TEXT);
            index = Math.floor(Math.random() * textLength.val());
            const textSample = await getReactionSample(GIPHY_TEXT, index);
            setCustomTTSSample(textSample.val());
        }

        if (!clipsSample && !customTTSSample) {
            getReactionsSample();
        }
    }, [user, clipsSample, customTTSSample, streamer]);

    const openMediaSelector = (mediaType) => {
        if (mediaType !== MEMES) {
            setOpenMediaDialog(true);
        } else {
            setOpenMemeMediaDialog(true);
        }

        setLocalMediaType(mediaType);
    }

    const onMediaSelected = (media) => {
        setOpenMediaDialog(false);
        setOpenMemeMediaDialog(false);
        if (localMediaType === GIPHY_TEXT) {
            setGiphyText(media);
        } else {
            setMediaType(localMediaType);
            setMediaSelected(media);
        }

        if (localMediaType === GIPHY_TEXT || localMediaType === GIPHY_CLIPS) {
            setCost(localMediaType === GIPHY_TEXT ? costs[GIPHY_TEXT] : costs[GIPHY_CLIPS]);
            onSuccess('checkout');
        } else {
            if (numberOfReactions <= 0) {
                setCost(costs[localMediaType]);
            }

            onSuccess('chatbot');
        }
    }

    const onTTSSelected = () => {
        if (numberOfReactions <= 0) {
            console.log(costs['tts']);
            setCost(costs['tts']);
        }

        onSuccess('chatbot');
    }

    return (
        <div style={{ maxWidth: '834px', width: '100%', height:'100vh' }}>
            {numberOfReactions !== undefined &&
                <>
                <Title>
                    {t('Layout.customReaction')}
                    {/* <img
                    style={{ width: "20px", height: "20px" }}
                    src={ellipse}
                    alt="icon"
                    /> */}
                </Title>
                {numberOfReactions &&
                    <div
                        style={{
                        maxWidth: "138px",
                        height: "36px",
                        backgroundColor: "#1C1E64",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        padding: "10px",
                        marginBottom: "44px",
                        borderRadius: "10px",
                        }}
                    >
                        <img
                        style={{ width: "14px", height: "14px", padding: "3px" }}
                        src={iconEstrella}
                        alt="icon"
                        />
                        <p style={{ fontWeight: "500", fontSize: "16px", color: '#FFF' }}>({numberOfReactions}) Reactions </p>
                    </div>
                }
                <Grid container gap={2} rowSpacing={2}>
                    <Grid  alignContent='center'>
                        <DeQButton onClick={() => openMediaSelector(GIPHY_GIFS)}
                            title={'Gifs'}
                            Icon={GifIcon}
                            background={gradientGifs}
                            showCost={numberOfReactions <= 0}
                            cost={costs[GIPHY_GIFS]} />
                    </Grid>
                    <Grid >
                        <DeQButton onClick={onTTSSelected}
                            title={'Text-To-Speech'}
                            Icon={TTSIcon}
                            background={gradientChat}
                            showCost={numberOfReactions <= 0}
                            cost={costs['tts']} />
                    </Grid>
                    <Grid >
                        <DeQButton onClick={() => openMediaSelector(GIPHY_STICKERS)}
                            title={'Stickers'}
                            Icon={StickerIcon}
                            background={gradientSticker}
                            showCost={numberOfReactions <= 0}
                            cost={costs[GIPHY_STICKERS]} />
                    </Grid>
                    <Grid >
                        <DeQButton onClick={() => openMediaSelector(MEMES)}
                            title={'Memes'}
                            Icon={MemesIcon}
                            background={gradientLOL}
                            showCost={numberOfReactions <= 0}
                            cost={costs[MEMES]} />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: 24 }} gap={2}>
                    {clipsSample &&
                        <Grid >
                            <DeQButtonPayments onClick={() => openMediaSelector(GIPHY_CLIPS)}
                                backgroundImageUrl={clipsSample}
                                Qoins={costs[GIPHY_CLIPS]}
                                title={'Clips'}
                            />
                        </Grid>
                    }
                    {customTTSSample &&
                        <Grid >
                            <DeQButtonPayments onClick={() => openMediaSelector(GIPHY_TEXT)}
                                backgroundColor={customTTSSample.background}
                                backgroundImageUrl={customTTSSample.url}
                                Qoins={costs[GIPHY_TEXT]}
                                title={t('Layout.customTTS')}
                            />
                        </Grid>
                    }
                </Grid>
                </>
                }
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
        </div>
    );
};

export default Layout;
