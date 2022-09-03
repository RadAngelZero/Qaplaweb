import React from 'react';
import { AppBar, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainAppBar = styled(AppBar)({
    backgroundColor: '#0D1021',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px',
});

const StreamerImage = styled(Avatar)({
    width: '32px',
    height: '32px',
    borderRadius: '16px',
});

const StreamerName = styled(Typography)({
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    marginLeft: '8px',
});

const LiveIcon = styled(Box)({
    backgroundColor: '#FF006B',
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    marginLeft: '6px',
})

const HeaderBar = (props) => {
    return (<>
        <MainAppBar>
            <StreamerImage src='https://static-cdn.jtvnw.net/jtv_user_pictures/5dfecb31-9033-48f8-885c-151c05689307-profile_image-70x70.png' />
            <StreamerName>
                {`test`}
            </StreamerName>
            <LiveIcon itemType='div' />
        </MainAppBar>
    </>)
}

export default HeaderBar;