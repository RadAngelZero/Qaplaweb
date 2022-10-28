import styled from '@emotion/styled';
import { Button, CircularProgress, Dialog, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloseIcon } from './../assets/icons/CloseIcon.svg';
import { ReactComponent as EditIcon } from './../assets/icons/Edit.svg';

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 16,
    right: 16
});

const Title = styled(Typography)({
    marginTop: '32px',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: -.72,
    lineHeight: '28.64px',
    textAlign: 'center',
    color: '#FFF'
});

const TextAccent = styled('span')({
    color: '#00FFDF'
});

const GoToStreamButton = styled(Button)({
    marginTop: '32px',
    background: '#3B4BF9',
    borderRadius: '40px',
    paddingTop: '26px',
    paddingBottom: '26px',
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: .49,
    color: '#FFF',
    width: '100%',
    '&:hover': {
        opacity: .9,
        background: '#3B4BF9'
    },
    '&:disabled': {
        opacity: .4,
        background: '#3B4BF9',
        color: '#FFF'
    }
});

const UpdatePopUpButton = styled(Button)({
    marginTop: '32px',
    borderRadius: '40px',
    textTransform: 'none',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: .35,
    color: '#FFF',
    width: '100%',
    '&:hover': {
        opacity: .9,
        color: '#FFF'
    },
    '&:disabled': {
        opacity: .4,
        color: '#FFF'
    }
});

const SendAvatarDialog = ({ onSendNow, onEditPopUp, open, onClose, streamerName, loadingPopUp }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open}
            sx={{
                background: 'transparent',
                backdropFilter: 'blur(50px)'
            }}
            PaperProps={{
                    style: {
                    backgroundColor: '#141539',
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'256px',
                    padding: '56px'
                }
            }}
            onClose={onClose}>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            <Title>
                {loadingPopUp ?
                    <CircularProgress sx={{
                        color: '#00FFDD'
                    }} />
                :
                    <>
                    {t('SendAvatarDialog.sendAviOn')}
                    <TextAccent>
                        {streamerName}
                    </TextAccent>
                    {t('SendAvatarDialog.streamerStream')}
                    </>
                }
            </Title>
            <GoToStreamButton onClick={onSendNow}
                disabled={loadingPopUp}>
                {t('SendAvatarDialog.popUpNow')}
            </GoToStreamButton>
            <UpdatePopUpButton onClick={onEditPopUp}
                startIcon={<EditIcon />}
                variant='text'
                disabled={loadingPopUp}>
                {t('SendAvatarDialog.updatePopUp')}
            </UpdatePopUpButton>
        </Dialog>
    );
}

export default SendAvatarDialog;