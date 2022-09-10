import React from 'react';
import { AppBar, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainAppBar = styled(Box)({
    backgroundColor: '#0D1021',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '835px',
    width: '100%',
    marginBottom: 24
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
    color: '#FFF'
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
            <StreamerImage src={props.streamerImage} />
            <StreamerName>
                {props.streamerName}
            </StreamerName>
            <LiveIcon itemType='div' />
        </MainAppBar>
    </>)
}

export default HeaderBar;