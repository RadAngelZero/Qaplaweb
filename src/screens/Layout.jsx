import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import DeQButton from "../components/DeQButton/DeQButton";
import DeQButtonPayments from "../components/DeQButtonPayments/DeQButtonPayments";
import iconEstrella from "../assets/IconEstrella.png";
import ellipse from "../assets/Ellipse.png";
import prop from "../Data";
import { propPagos } from "../Data";
import iconLOL from '../assets/IconLOL.png';
import iconChat from '../assets/iconChat.png';
import iconGIF from '../assets/IconGIF.svg';
import iconSticker from '../assets/IconStickers.png';
import gradientGifs from '../assets/GradientGifs.png';

import gradientChat from '../assets/GradientChat.png';
import gradientLOL from '../assets/GradientLOL.png';
import gradientSticker from '../assets/GradientSticker.png';
import { getUserReactionsWithStreamer } from "../services/database";

const Layout = ({ user, streamerUid }) => {
    const [numberOfReactions, setNumberOfReactions] = useState(undefined);

    useEffect(() => {
        async function getReactions() {
            console.log(streamerUid);
            const numberOfReactions = await getUserReactionsWithStreamer(user.id, streamerUid);

            setNumberOfReactions(numberOfReactions.val());
        }

        if (user && user.id && streamerUid) {
            getReactions();
        }
    }, [user]);

    return (
        <div>
            {numberOfReactions !== undefined &&
                <>
                <h1 style={{ textAlign: "start", fontSize: "22px", fontWeight: "600" }}>
                    Custom Reaction{" "}
                    <img
                    style={{ width: "20px", height: "20px" }}
                    src={ellipse}
                    alt="icon"
                    />
                </h1>
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
                    <p style={{ fontWeight: "500", fontSize: "16px" }}>({numberOfReactions}) Ractions </p>
                </div>
                <Box>
                    <Grid container gap={3}>
                        <DeQButton
                            Title={'Gifs'}
                            imagen={iconGIF}
                            background={gradientGifs}
                            />
                        <DeQButton
                            Title={'Text-To-Speech'}
                            imagen={iconChat}
                            background={gradientChat}
                            />
                        <DeQButton
                            Title={'Stickers'}
                            imagen={iconSticker}
                            background={gradientSticker}
                            />
                        <DeQButton
                            Title={'Memes'}
                            imagen={iconLOL}
                            background={gradientLOL}
                            />
                    </Grid>
                    <div>
                    <Grid container gap={3}>
                        {propPagos.map((el) => (
                        <DeQButtonPayments
                            background={el.background}
                            Qoins={el.Qoins}
                            title={el.title}
                        />
                        ))}
                    </Grid>
                    </div>
                </Box>
                </>
            }
        </div>
    );
};

export default Layout;
