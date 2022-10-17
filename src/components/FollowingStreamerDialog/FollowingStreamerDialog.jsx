import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Following from './../../assets/gifs/following.gif';

const Content = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '72px',
    paddingLeft: '48px',
    paddingRight: '48px',
    paddingBottom: '32px'
});

const DialogTitle = styled(DialogContentText)({
    marginTop: '32px',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '-2%',
    color: '#FFF'
});

const DialogDescription = styled(DialogContentText)({
    marginTop: '8px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '24px',
    textAlign: 'center',
    letterSpacing: '-2%',
    color: '#8F9BBA'
});

const StreamerName = styled('span')({
    color: '#00FFDD',
    fontWeight: '600',
});

const Actions = styled(DialogActions)({
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: '48px'
});

const DownloadButton = styled(Button)({
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
    }
});

const FollowingStreamerDialog = ({ open, onClose, streamerName }) => {
    const  { t } = useTranslation();

    const goToDownloadApp = () => {
        window.open('https://qapla.app.link/download', '_blank');
        onClose();
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
                <img src={Following} width={170} height={96} />
                <DialogTitle>
                    {t('FollowingStreamerDialog.following')}
                </DialogTitle>
                <DialogDescription>
                    {t('FollowingStreamerDialog.getUpdatesP1')}
                    <StreamerName>
                        {t('FollowingStreamerDialog.streamer', { streamerName })}
                    </StreamerName>
                    {t('FollowingStreamerDialog.getUpdatesP2')}
                </DialogDescription>
            </Content>
            <Actions>
                <DownloadButton onClick={goToDownloadApp}>
                    {t('FollowingStreamerDialog.downloadApp')}
                </DownloadButton>
            </Actions>
        </Dialog>
    );
}

export default FollowingStreamerDialog;