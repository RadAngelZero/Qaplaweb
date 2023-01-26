import { Button, Box, styled, Typography, Dialog } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

import avatarHeading from '../../assets/AvatarHeading.png';
import illustration from '../../assets/Illustration.png';
import { ReactComponent as CloseIcon } from '../../assets/icons/CloseIcon.svg';
import { ReactComponent as TickSquare } from '../../assets/icons/TickSquare.svg';
import { useState } from 'react';


const AvatarHeading = styled('img')({
    maxWidth: '205px',
});

const Illustration = styled('img')({
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    maxWidth: '50%',
});

const ConfirmDialog = styled(Dialog)({
    '.MuiBackdrop-root': {
        backgroundColor: '#0000',
    },
    '.MuiDialog-paper': {
        backgroundColor: '#141539',
        padding: '56px 40px',
        borderRadius: '40px',
    },
});

const CloseIconContainer = styled(Box)({
    position: 'absolute',
    top: '16px',
    right: '8px',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.8,
    }
});

const TickSquareContainer = styled(Box)({
    alignSelf: 'center',
    borderRadius: '1000px',
    boxShadow: '0px 20px 40px -10px rgba(0, 255, 221, 0.3)',
    marginTop: '-8px',
});

const DialogTitle = styled('p')({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '19px',
    letterSpacing: '-0.7200000286102295px',
    textAlign: 'center',
    margin: '0px',
    marginTop: '32px',
});

const DialogSubtitle = styled('p')({
    color: '#fff',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    textAlign: 'center',
    maxWidth: '245px',
    margin: '0px',
    marginTop: '16px',
});

const ConfirmButton = styled(Button)({
    alignSelf: 'center',
    backgroundColor: '#3B4BF9',
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'none',
    marginTop: '32px',
    padding: '24px 48px',
    width: '195px',
    borderRadius: '14px',
    '&:hover': {
        backgroundColor: '#3B4BF9aa',
    }
});

const SecondPanelBlur = styled(Box)({
    position: 'absolute',
    top: -10,
    right: -10,
    left: -10,
    bottom: -10,
    backdropFilter: 'blur(25px)',
    backgroundColor: '#0005',
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

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(true);

    return (<>
        <SecondPanel>
            <AvatarHeading src={avatarHeading} />
            <Illustration src={illustration} />
            <ConfirmDialog open={confirmDialogOpen} onClose={() => { setConfirmDialogOpen(false) }}>
                <CloseIconContainer onClick={() => { setConfirmDialogOpen(false) }}>
                    <CloseIcon />
                </CloseIconContainer>
                <TickSquareContainer>
                    <TickSquare />
                </TickSquareContainer>
                <DialogTitle>
                    Boom. Avi Created.
                </DialogTitle>
                <DialogSubtitle>
                    Your avi is ready to use on stream, you can go back to Twitch.
                </DialogSubtitle>
                <ConfirmButton onClick={() => { setConfirmDialogOpen(false) }}>
                    Understood
                </ConfirmButton>
            </ConfirmDialog>
            {confirmDialogOpen &&
                <SecondPanelBlur />
            }
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>☝️ Avatar Tip:</ThirdPanelTitle>
            <ThirdPanelSubtitle><b>Claim you avatar</b> at the end of the process so you can edit it on other browsers and our mobile app.</ThirdPanelSubtitle>
        </ThirdPanel>
    </>)
}

export default Avatar