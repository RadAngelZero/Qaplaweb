import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import { Box, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getAnimationsData, saveUserGreetingAnimation } from '../services/database';
import AvatarAnimated from './AvatarAnimated';
import { useAuth } from '../AuthProvider';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#00020E'
});

const CanvasContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '835px',
    height: '300px'
});

const GradientContainer = styled(Box)((props) => ({
    padding: 3,
    background: props.active === 'true' ? 'linear-gradient(135deg, #FF9999, #A87EFF)' : '#141539',
    height: 80,
    width: 80,
    borderRadius: 10,
    boxShadow: '0px 2.86125px 7.15312px rgba(0, 0, 0, 0.35)'
}));

const AnimationButton = styled(Button)({
    padding: 3,
    background: '#141539',
    height: 80,
    width: 80,
    borderRadius: 10,
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '14px',
    color: '#FFF',
    textTransform: 'none',
    '&:hover': {
        opacity: .9,
        background: '#141539'
    },
    '&:disabled': {
        background: '#141539',
        color: '#FFF'
    }
});

const AnimationPicker = styled(Box)({
    marginTop: '72px',
    padding: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
    alignContent: 'center'
});

const UseAnimationButton = styled(Button)({
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
    },
    '&:disabled': {
        opacity: 0.4,
        backgroundColor: '#00FFDD'
    }
});

const AvatarChooseAnimation = () => {
    const [currentAnimation, setCurrentAnimation] = useState(null);
    const [animations, setAnimations] = useState({});
    const [showAnimation, setShowAnimation] = useState(false);
    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        async function getAnimation() {
            const animationData = await getAnimationsData();
            const defaultAnimationKey = Object.keys(animationData.val())[0];
            const defaultAnimation = animationData.val()[defaultAnimationKey];
            setCurrentAnimation({ ...defaultAnimation, id: defaultAnimationKey });
            setAnimations(animationData.val());
        }

        getAnimation();
    }, []);

    const changeAnimation = (animation) => {
        setShowAnimation(false);
        setCurrentAnimation(animation);
    }

    const saveAnimation = async () => {
        await saveUserGreetingAnimation(user.id, currentAnimation.id);
        navigate('/popup/tts', {
            state: location.state
        });
    }

    return (
        <Container>
            <CanvasContainer>
                {!showAnimation &&
                    <CircularProgress sx={{
                        color: '#00FFDD',
                        position: 'absolute',
                    }} />
                }
                <Canvas camera={{ position: [10, 10, 10] }}
                    style={{
                        backgroundColor: 'transparent',
                        width: '400px',
                        height: '300px',
                        opacity: showAnimation ? 1 : 0
                    }}>
                    {currentAnimation &&
                        <>
                        <ambientLight intensity={1} />
                        <directionalLight intensity={0.4} />
                        <Suspense fallback={null}>
                            <AvatarAnimated avatarUrl={`https://api.readyplayer.me/v1/avatars/${user.avatarId}.glb`}
                                animationData={currentAnimation}
                                showAnimation={showAnimation}
                                setShowAnimation={setShowAnimation} />
                        </Suspense>
                        </>
                    }
                </Canvas>
            </CanvasContainer>
            <AnimationPicker>
                {currentAnimation && Object.keys(animations).map((animationKey, index) => (
                    <GradientContainer key={`gradient-${index}`}
                        active={(currentAnimation.name === animations[animationKey].name).toString()}>
                        <AnimationButton disableRipple
                            disabled={currentAnimation.name === animations[animationKey].name}
                            onClick={() => changeAnimation({ ...animations[animationKey], id: animationKey})}>
                            {animations[animationKey].name}
                        </AnimationButton>
                    </GradientContainer>
                ))}
            </AnimationPicker>
            <UseAnimationButton onClick={saveAnimation}>
                {t('AvatarChooseAnimation.useAnimation')}
            </UseAnimationButton>
        </Container>
    );
}

export default AvatarChooseAnimation;