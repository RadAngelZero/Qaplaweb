import { Button, Box, styled, Typography } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

const ThirdPanelTitle = styled('p')({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '19px',
});

const ThirdPanelSubtitle = styled('p')({
    color: '#fff',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    // maxWidth: '216px',
});


const How = () => {
    return (<>
        <SecondPanel>
            <iframe style={{ flex: 1, margin: '-48px' }} src="https://www.youtube.com/embed/videoseries?list=PLLeKPCTveJHgJgdpxusQ9vJycOhrtbLpE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>☝️ Avatar Tip:</ThirdPanelTitle>
            <ThirdPanelSubtitle><b>Claim you avatar</b> at the end of the process so you can edit it on other browsers and our mobile app.</ThirdPanelSubtitle>
        </ThirdPanel>
    </>)
}

export default How;