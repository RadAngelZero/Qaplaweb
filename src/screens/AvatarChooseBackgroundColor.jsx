import { useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AVATAR_GRADIENTS } from '../utils/colors';
import { useAuth } from '../AuthProvider';
import { saveAvatarBackground } from '../services/database';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
});

const AvatarContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const InstructionsTitle = styled(Typography)({
    marginTop: '40px',
    color: '#FFF',
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: -.41,
    textAlign: 'center'
});

const InstructionsDescription = styled(Typography)({
    marginTop: '12px',
    color: 'rgba(255, 255, 255, .8)',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '21.48px',
    letterSpacing: -.41,
    textAlign: 'center',
    width: '250px'
});

const AvatarImage = styled(Avatar)((props) => ({
    background: props.lineargradient,
    height: '200px',
    width: '200px',
    borderRadius: '100px'
}));

const GradientButton = styled(Button)((props) => ({
    background: props.lineargradient,
    border: props.active === 'true' ? '3px solid #00FFDD' : 'none',
    height: 60,
    width: 60,
    borderRadius: 14,
    boxShadow: '0px 2.86125px 7.15312px rgba(0, 0, 0, 0.35)'
}));

const ColorPicker = styled(Box)({
    marginTop: '72px',
    padding: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
    alignContent: 'center'
});

const UseBackgroundButton = styled(Button)({
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

const AvatarChooseBackgroundColor = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(AVATAR_GRADIENTS[0]);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const getLinearGradient = (gradientData) => {
        let colors = '';
        gradientData.colors.forEach((color, index) => {
            if (index < gradientData.colors.length - 1) {
                colors += `${color},`;
            } else {
                colors += `${color}`;
            }
        });

        return `linear-gradient(${gradientData.angle}deg, ${colors})`;
    }

    const setBackground = (index) => {
        setBackgroundColor(AVATAR_GRADIENTS[index]);
        setBackgroundIndex(index);
    }

    const saveBackgroundColor = async () => {
        await saveAvatarBackground(user.id, backgroundColor);
        navigate('/avatar/animation', {
            state: location.state
        })
    }

    return (
        <Container>
            <AvatarContainer>
                <AvatarImage lineargradient={getLinearGradient(backgroundColor)}
                    src={`https://api.readyplayer.me/v1/avatars/${user.avatarId}.png?scene=fullbody-portrait-v1-transparent`}
                    onLoad={(e) => setImageLoaded(true)} />
                <InstructionsTitle>
                    {imageLoaded ?
                        t('AvatarChooseBackgroundColor.pickABackground')
                        :
                        t('AvatarChooseBackgroundColor.loading')
                    }
                </InstructionsTitle>
                {imageLoaded &&
                    <InstructionsDescription>
                        {t('AvatarChooseBackgroundColor.description')}
                    </InstructionsDescription>
                }
            </AvatarContainer>
            <ColorPicker>
                {AVATAR_GRADIENTS.map((gradient, index) => (
                    <GradientButton lineargradient={getLinearGradient(gradient)}
                        key={`gradient-${index}`}
                        disableRipple
                        active={(index === backgroundIndex).toString()}
                        onClick={() => setBackground(index)} />
                ))}
            </ColorPicker>
            <UseBackgroundButton onClick={saveBackgroundColor}
                disabled={!imageLoaded}>
                {t('AvatarChooseBackgroundColor.useBackground')}
            </UseBackgroundButton>
        </Container>
    );
}

export default AvatarChooseBackgroundColor;