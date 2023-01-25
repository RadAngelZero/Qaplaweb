import { Button, Box, styled, Typography } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

import avatarHeading from '../../assets/AvatarHeading.png';
import illustration from '../../assets/Illustration.png';

const AvatarHeading = styled('img')({
    maxWidth: '205px',
});

const Illustration = styled('img')({
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    maxWidth: '50%',
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


const Avatar = () => {
    return (<>
        <SecondPanel>
            <AvatarHeading src={avatarHeading} />
            <Illustration src={illustration} />
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>☝️ Avatar Tip:</ThirdPanelTitle>
            <ThirdPanelSubtitle><b>Claim you avatar</b> at the end of the process so you can edit it on other browsers and our mobile app.</ThirdPanelSubtitle>
        </ThirdPanel>
    </>)
}

export default Avatar