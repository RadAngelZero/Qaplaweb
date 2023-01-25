import { Button, Box, styled, Typography } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

import reactOnTheGo from '../../assets/Reactonthego.png';

const ReactOnTheGo = styled('img')({
    width: '240px',
    alignSelf: 'center',
});

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


const Download = () => {
    return (<>
        <SecondPanel>
            <ReactOnTheGo src={reactOnTheGo} />
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>☝️ Avatar Tip:</ThirdPanelTitle>
            <ThirdPanelSubtitle><b>Claim you avatar</b> at the end of the process so you can edit it on other browsers and our mobile app.</ThirdPanelSubtitle>
        </ThirdPanel>
    </>)
}

export default Download;