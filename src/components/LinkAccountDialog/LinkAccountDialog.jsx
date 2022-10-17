import { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import Dialing from './../../assets/gifs/Dialing.gif';
import { signInWithTwitchPopUp } from '../../services/twitch';
import { authWithTwitch } from '../../services/auth';

const Content = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '72px',
    paddingLeft: '48px',
    paddingRight: '48px',
    paddingBottom: '32px'
});

const DialogText = styled(DialogContentText)({
    marginTop: '32px',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '24px',
    textAlign: 'center',
    letterSpacing: '-2%',
    color: '#FFF'
});

const Actions = styled(DialogActions)({
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: '48px'
});

const LinkButton = styled(Button)({
    fontSize:'14px',
    color:'#FFFFFF',
    fontWeight:'600',
    backgroundColor: '#3B4BF9',
    borderRadius:'16px',
    height: '56px',
    width: '202px',
    textTransform:'none',
    boxShadow: '0px 20px 40px -10px rgba(59, 75, 249, 0.4)',
    '&:hover': {
        opacity: 0.9,
        backgroundColor: '#3B4BF9'
    },
    '&:disabled': {
        opacity: 0.8,
        backgroundColor: '#3B4BF9',
        color: '#FFF'
    }
});

const LinkAccountDialog = ({ open, onClose, streamerName, onSuccessfulSignIn }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const signIn = async () => {
        const twitchClientCode = await signInWithTwitchPopUp();
        if (twitchClientCode) {
            setIsLoading(true);
            // Firebase auth listener might not be that fast, so we send the uid as parameter to the startFollowing function
            await authWithTwitch(twitchClientCode, onSuccessfulSignIn);
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                style: {
                    maxWidth: '350px',
                    backgroundColor: '#141833',
                    borderRadius: '40px'
                }
            }}>
            <Content>
                <img src={Dialing} width={180} height={90} />
                <DialogText>
                    {t('LinkAccountDialog.linkToFollow')} <span style={{ color: '#00FFDD' }}>{streamerName}</span>
                </DialogText>
            </Content>
            <Actions>
                <LinkButton onClick={signIn} disabled={isLoading}>
                    {isLoading ?
                        <CircularProgress sx={{
                            color: '#00FFDD'
                        }} />
                    :
                        t('LinkAccountDialog.continueWithTwitch')
                    }
                </LinkButton>
            </Actions>
        </Dialog>
    );
}

export default LinkAccountDialog;