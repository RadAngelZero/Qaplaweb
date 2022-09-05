import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import DeQButton from "../components/DeQButton/DeQButton";
import DeQButtonPayments from "../components/DeQButtonPayments/DeQButtonPayments";
import iconEstrella from "../assets/IconEstrella.png";
import ellipse from "../assets/Ellipse.png";
import iconLOL from '../assets/IconLOL.png';
import iconChat from '../assets/iconChat.png';
import iconGIF from '../assets/IconGIF.svg';
import iconSticker from '../assets/IconStickers.png';
import gradientGifs from '../assets/GradientGifs.png';
import gradientChat from '../assets/GradientChat.png';
import gradientLOL from '../assets/GradientLOL.png';
import gradientSticker from '../assets/GradientSticker.png';
import { getReactionSample, getReactionsSamplesCount, getReactionTypeCost, getUserReactionsWithStreamer } from "../services/database";
import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEMES } from "../utils/constants";
import MediaSelector from "./MediaSelector";
import MemeMediaSelector from "./MemeMediaSelector";


import {Title} from '../components/DeQButtonPayments/DeQButtonPayments'



const Layout = ({ user, streamer, setMediaSelected, mediaType, setMediaType, setGiphyText }) => {

    const [numberOfReactions, setNumberOfReactions] = useState(undefined);
    const [clipsCost, setClipsCost] = useState(null);
    const [clipsSample, setClipsSample] = useState(null);
    const [customTTSCost, setCustomTTSCost] = useState(null);
    const [customTTSSample, setCustomTTSSample] = useState(null);
    const [openMediaDialog, setOpenMediaDialog] = useState(false);
    const [openMemeMediaDialog, setOpenMemeMediaDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

        async function getReactionsCosts() {
            const clipsCost = await getReactionTypeCost(GIPHY_CLIPS);
            const customTTSCost = await getReactionTypeCost(GIPHY_TEXT);
            setClipsCost(clipsCost.val());
            setCustomTTSCost(customTTSCost.val());
        }

        async function getReactionsCount() {
            const numberOfReactions = await getUserReactionsWithStreamer(user.id, streamer.uid);

            setNumberOfReactions(numberOfReactions.val() || 0);
        }

        if (user && user.id && streamer) {
            getReactionsCount();
        }

        if (!clipsCost && !customTTSCost) {
            getReactionsCosts();
        }

        if (!clipsSample && !customTTSSample) {
            getReactionsSample();
        }
    }, [user, clipsCost, customTTSCost]);

    const openMediaSelector = (mediaType) => {
        if (mediaType !== MEMES) {
            setOpenMediaDialog(true);
        } else {
            setOpenMemeMediaDialog(true);
        }

        setMediaType(mediaType);
    }

    const onMediaSelected = (media) => {
        if (mediaType === GIPHY_TEXT) {
            setGiphyText(media);
        } else {
            setMediaSelected(media);
        }
        setOpenMediaDialog(false);
        setOpenMemeMediaDialog(false);
    }

    return (
        <div>
            {numberOfReactions !== undefined &&
                <>
                <Title>
                    Custom Reaction{" "}
                    <img
                    style={{ width: "20px", height: "20px" }}
                    src={ellipse}
                    alt="icon"
                    />
                </Title>
                <div
                    style={{
                    maxWidth: "138px",
                    height: "36px",
                    backgroundColor: "#1C1E64",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: "10px",
                    marginBottom: "16px",
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
                <Box>
                    <Grid container gap={3}>
                        <DeQButton onClick={() => openMediaSelector(GIPHY_GIFS)}
                            title={'Gifs'}
                            imagen={iconGIF}
                            background={gradientGifs}
                            />
                        <DeQButton onClick={() => openMediaSelector(GIPHY_GIFS)}
                            title={'Text-To-Speech'}
                            imagen={iconChat}
                            background={gradientChat}
                            />
                        <DeQButton onClick={() => openMediaSelector(GIPHY_STICKERS)}
                            title={'Stickers'}
                            imagen={iconSticker}
                            background={gradientSticker}
                            />
                        <DeQButton onClick={() => openMediaSelector(MEMES)}
                            title={'Memes'}
                            imagen={iconLOL}
                            background={gradientLOL}
                            />
                    </Grid>
                    <Grid container gap={3}>
                        {clipsSample &&
                            <DeQButtonPayments onClick={() => openMediaSelector(GIPHY_CLIPS)}
                                backgroundImageUrl={clipsSample}
                                Qoins={clipsCost}
                                title={'Clips'}
                            />
                        }
                        {customTTSSample &&
                            <DeQButtonPayments onClick={() => openMediaSelector(GIPHY_TEXT)}
                                backgroundColor={customTTSSample.background}
                                backgroundImageUrl={customTTSSample.url}
                                Qoins={customTTSCost}
                                title={'Custom TTS'}
                            />
                        }
                    </Grid>
                </Box>
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
        </div>
    );
};

export default Layout;
