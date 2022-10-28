import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AvatarReaction from './../assets/images/AvatarReaction.png';
import AvatarAnimation from './../assets/gifs/Swing.gif';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
});

const InnerContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
});

const SlideTextContainer = styled(Box)({
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const SlideTitle = styled(Typography)({
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: -.41,
    textAlign: 'center',
    color: '#FFF'
});

const SlideDescription = styled(Typography)({
    marginTop: '16px',
    height: '63px',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '21.48px',
    letterSpacing: -.41,
    textAlign: 'center',
    maxWidth: '250px',
    color: 'rgba(255, 255, 255, .8)'
});

const NextButton = styled(Button)({
    marginTop: 56,
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

const ProgressContainer = styled(Box)({
    marginTop: '32px',
    display: 'flex',
    width: 52,
    justifyContent: 'space-between'
});

const ActiveStep = styled(Box)({
    backgroundColor: '#00FEDF',
    borderRadius: '4px',
    width: 30,
    height: 8
});

const Step = styled(Box)({
    backgroundColor: 'rgba(0, 254, 223, 0.6)',
    borderRadius: '100px',
    marginTop: 'auto',
    width: 8,
    height: 8
});

const DynamicStep = ({ currentStep, step }) => (
    step === currentStep ? <ActiveStep /> : <Step />
);

const AvatarOnboardingDialog = ({ open, onClose, streamerUid }) => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const nextStep = () => {
        if (step === 0) {
            setStep(step + 1);
        } else {
            navigate('/avatar/customize', {
                state: {
                    streamerUid
                }
            });
        }
    }

    return (
        <Dialog open={open}
            onClose={onClose}
            fullWidth
            sx={{
                background: 'rgba(2, 7, 30, 0.5)',
                backdropFilter: 'blur(50px)'
            }}
            PaperProps={{
                style: {
                    maxWidth: '618px',
                    backgroundColor: '#0D1021',
                    borderRadius: '40px'
                }
            }}>
            <Container>
                <InnerContainer>
                    <img src={step === 0 ? AvatarReaction : AvatarAnimation}
                        alt='Avatar Reaction'
                        width={238}
                        height={210} />
                    <SlideTextContainer>
                        <SlideTitle>
                            {step === 0 ?
                                'React with personality'
                                :
                                'Boost your Twitch Sub'
                            }
                        </SlideTitle>
                        <SlideDescription>
                            {step === 0 ?
                                'Your avi appears on any reaction you send on stream'
                                :
                                'Use a custom animation when you show up on stream and make an entrance'
                            }
                        </SlideDescription>
                    </SlideTextContainer>
                    <NextButton onClick={nextStep}>
                        {step === 0 ?
                            'Next'
                            :
                            'Create my Avatar'
                        }
                    </NextButton>
                    <ProgressContainer>
                        <DynamicStep currentStep={step}
                            step={0} />
                        <DynamicStep currentStep={step}
                            step={1} />
                    </ProgressContainer>
                </InnerContainer>
            </Container>
        </Dialog>
    );
}

export default AvatarOnboardingDialog;