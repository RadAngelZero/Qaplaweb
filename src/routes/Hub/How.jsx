import { useState } from 'react';
import { Box, styled } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

import { ReactComponent as PlayCircle } from '../../assets/icons/PlayCircle.svg';

const ThirdPanelTitle = styled('p')({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '19px',
});

const VideosContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

const PlayVideoContainer = styled(Box)({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    cursor: 'pointer',
});

const VideoTitle = styled('p')({
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    // maxWidth: '216px',
    margin: '0px',
});


const How = () => {

    const [video, setVideo] = useState('https://www.youtube.com/embed/videoseries?list=PLLeKPCTveJHgJgdpxusQ9vJycOhrtbLpE')

    return (<>
        <SecondPanel>
            <iframe style={{ flex: 1, margin: '-48px' }} src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>🎥 Playlist:</ThirdPanelTitle>
            <VideosContainer>
                <PlayVideoContainer onClick={() => {
                    /*
                    https://www.youtube.com/embed/d4W3myejxg4?autoplay=1
                    https://www.youtube.com/embed/ -> base
                    d4W3myejxg4 -> id
                    ?autoplay=1 -> autoplay on
                    */
                    setVideo('https://www.youtube.com/embed/d4W3myejxg4?autoplay=1');
                }}>
                    <PlayCircle />
                    <VideoTitle>
                        How it works
                    </VideoTitle>
                </PlayVideoContainer>
                <PlayVideoContainer onClick={() => {
                    setVideo('https://www.youtube.com/embed/ktlJC213PPs?autoplay=1');
                }}>
                    <PlayCircle />
                    <VideoTitle>
                        How to react
                    </VideoTitle>
                </PlayVideoContainer>
                <PlayVideoContainer onClick={() => {
                    setVideo('https://www.youtube.com/embed/8cQSCIWHwRQ?autoplay=1');
                }}>
                    <PlayCircle />
                    <VideoTitle>
                        How to create your avatar
                    </VideoTitle>
                </PlayVideoContainer>
                <PlayVideoContainer onClick={() => {
                    setVideo('https://www.youtube.com/embed/ylGOzLyBsG4?autoplay=1');
                }}>
                    <PlayCircle />
                    <VideoTitle>
                        How to upload memes
                    </VideoTitle>
                </PlayVideoContainer>
            </VideosContainer>
        </ThirdPanel>
    </>)
}

export default How;