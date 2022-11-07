import styled from '@emotion/styled';
import { Button, Dialog, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WarningIcon } from './../assets/icons/WarningCircle.svg';
import { ReactComponent as CloseIcon } from './../assets/icons/CloseIcon.svg';

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
    textAlign: 'center',
    color: '#FFF'
});

const Description = styled(Typography)({
    marginTop: '32px',
    fontSize: '16px',
    lineHeight: '19.09px',
    letterSpacing: .25,
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
    }
});

const PopUpAlreadySentDialog = ({ open, onClose, streamerName }) => {
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
            <WarningIcon />
            <Title>
                {t('PopUpAlreadySentDialog.alreadyPoped')}
            </Title>
            <Description>
                <TextAccent>
                    {t('PopUpAlreadySentDialog.popUpOnce')}
                </TextAccent>
                {t('PopUpAlreadySentDialog.use')}
            </Description>
            <GoToStreamButton onClick={() => window.open(`https://twitch.tv/${streamerName.toLowerCase()}`, '_blank')}>
                {t('PopUpAlreadySentDialog.goToStream')}
            </GoToStreamButton>
        </Dialog>
    );
}

export default PopUpAlreadySentDialog;