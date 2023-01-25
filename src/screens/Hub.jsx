import { useState } from 'react';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { Button, Box, styled, Typography } from '@mui/material';

import SecondPanel from '../components/Hub/SecondPanel';
import ThirdPanel from '../components/Hub/ThirdPanel';

import backgroundImg from '../assets/QreatorsWallpaper.png';

import { ReactComponent as QaplaLogo } from '../assets/QaplaLogo.svg';
import { ReactComponent as Discord } from '../assets/Discord.svg';
import { ReactComponent as Twitter } from '../assets/Twitter.svg';
import { ReactComponent as YouTube } from '../assets/YouTube.svg';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    background: `url(${backgroundImg})`,
    height: '100vh',
    width: '100wh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const QaplaLogoContainer = styled(Box)({
    display: 'flex',
    margin: '44px auto 0px auto',
});

const PanelsContainer = styled(Box)({
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: '36px 56px 72px 56px',
    gap: '32px',
});

const FirstPanel = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: '#0D1021B2',
    borderRadius: '20px',
    backdropFilter: 'blur(25px)',
    padding: '48px',
    webkitBoxSizing: 'border-box',
    mozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    border: '3px solid rgba(13, 16, 33, 0.35)',
    boxShadow: '0px 20px 100px 30px rgba(0, 0, 0, 0.35)',
});

const MenuOptionContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
})

const MenuOption = styled('p')({
    display: 'flex',
    color: '#FFFFFF99',
    margin: '0px',
});

const SocialMediaContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    cursor: 'pointer',
});

const Hub = (props) => {

    return (<Container>
        <QaplaLogoContainer>
            <QaplaLogo />
        </QaplaLogoContainer>
        <PanelsContainer>
            <FirstPanel>
                <MenuOptionContainer>
                    <MenuOption style={{ color: useMatch('/hub/avatar') ? '#fff' : '#FFFFFF99' }}>
                        <Link to={`/hub/avatar`}>
                            👽 My Avatar
                        </Link>
                    </MenuOption>
                    <MenuOption style={{ color: useMatch('/hub/how') ? '#fff' : '#FFFFFF99' }}>
                        <Link to={`/hub/how`}>
                            🦮 How it works
                        </Link>
                    </MenuOption>
                    <MenuOption style={{ color: useMatch('/hub/download') ? '#fff' : '#FFFFFF99' }}>
                        <Link to={`/hub/download`}>
                            📱 Mobile app
                        </Link>
                    </MenuOption>
                    <MenuOption style={{ color: useMatch('/hub/support') ? '#fff' : '#FFFFFF99' }}>
                        <Link to={`/hub/support`}>
                            💬 Support
                        </Link>
                    </MenuOption>
                </MenuOptionContainer>
                <SocialMediaContainer>
                    <Discord onClick={() => {
                        window.open('https://discord.gg/6GBHn78', '_blank');
                    }} />
                    <Twitter onClick={() => {
                        window.open('https://twitter.com/qaplagg', '_blank');
                    }} />
                    <YouTube onClick={() => {
                        window.open('https://www.youtube.com/channel/UCR1CoM7kaeWViGgwE2FNlog', '_blank');
                    }} />
                </SocialMediaContainer>
            </FirstPanel>
            <Outlet />
        </PanelsContainer>
    </Container>);
};

export default Hub;