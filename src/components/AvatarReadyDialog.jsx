import { Suspense } from 'react';
import { Box, Button, CircularProgress, Dialog, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import AvatarAnimated from '../screens/AvatarAnimated';

const CanvasContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '835px',
    height: '300px'
});

const Title = styled(Typography)({
    marginTop: '96px',
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: -.41,
    textAlign: 'center',
    color: '#FFF'
});

const Description = styled(Typography)({
    marginTop: '16px',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '21.48px',
    letterSpacing: -.41,
    textAlign: 'center',
    color: '#FFF',
    maxWidth: '250px'
});

const PopUpButton = styled(Button)({
    marginTop: '32px',
    backgroundColor: '#00FFDD',
    borderRadius: '40px',
    width: '260px',
    paddingTop: '26px',
    paddingBottom: '26px',
    color: '#0D1021',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: .49,
    lineHeight: '22px',
    textTransform: 'none',
    '&:hover': {
        opacity: 0.9,
        backgroundColor: '#00FFDD'
    }
});

const BackToProfileButton = styled(Button)({
    marginTop: '24px',
    padding: 0,
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: .49,
    color: '#FFF',
    textTransform: 'none',
    '&:disabled': {
        opacity: 0.4,
        color: '#FFF'
    }
});

const AvatarReadyDialog = ({ open, onClose, avatarId, animationData, onPopUp, onBack, loading }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open}
            onClose={onClose}
            fullWidth
            sx={{
                background: 'transparent',
                backdropFilter: 'blur(50px)'
            }}
            PaperProps={{
                style: {
                    maxWidth: '835px',
                    width: '835px',
                    backgroundColor: 'transparent',
                    borderRadius: '40px',
                    alignItems: 'center',
                    boxShadow: 'none'
                }
            }}>
            <CanvasContainer>
                <Canvas camera={{ position: [10, 10, 10] }}
                    style={{
                        backgroundColor: 'transparent',
                        width: '380px',
                        height: '285px'
                    }}>
                    {animationData &&
                        <>
                        <ambientLight intensity={1} />
                        <directionalLight intensity={0.4} />
                        <Suspense fallback={null}>
                            <AvatarAnimated avatarUrl={`https://api.readyplayer.me/v1/avatars/${avatarId}.glb`}
                                animationData={animationData}
                                showAnimation={true} />
                        </Suspense>
                        </>
                    }
                </Canvas>
            </CanvasContainer>
            <Title>
                {t('AvatarReadyDialog.aviReady')}
            </Title>
            <Description>
                {t('AvatarReadyDialog.sayHi')}
            </Description>
            <PopUpButton onClick={onPopUp}
                disabled={loading}>
                {loading ?
                    <CircularProgress sx={{
                        color: '#0D1021'
                    }} />
                :
                    t('AvatarReadyDialog.popUpNow')
                }
            </PopUpButton>
            <BackToProfileButton onClick={onBack}
                disabled={loading}>
                {t('AvatarReadyDialog.backToProfile')}
            </BackToProfileButton>
        </Dialog>
    );
}

export default AvatarReadyDialog;