import React from 'react';
import { AppBar, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import icon from '../assets/icons/Qoin.svg'

const MainAppBar = styled(Box)({
    backgroundColor: '#0D1021',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '835px',
    width: '100%',
    marginBottom: 24,
    flexWrap:'wrap'
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
});

const MyQoins = styled('div')({
  marginRight:'78px',
  display: 'flex',
  alignItems: 'center',
})

const Text = styled(Typography)({
    fontSize:'18px',
    fontWeight:'600',
    color:'#FFFFFF',
    letter: '0.35px',
    font:'SF Pro Rounded'
})

const Qoins = styled(Typography)({
    fontSize: '24px',
    fontWeight:'700',
    color:'#FFFFFF',
})

const Icons = styled('img')({
  width:'20px',
  height:'20px',
  marginLeft:'10px',
  marginRight:'5px'
})

const HeaderBar = (props) => {

    return (<>
        <MainAppBar>
            <div style={{ display:'flex', flexDirection:'row', alignItems: 'center'}}> 
                <StreamerImage src={props.streamerImage} />
                    <StreamerName>
                        {props.streamerName}
                </StreamerName>
                <LiveIcon itemType='div' />
            </div>
           <MyQoins >
                <Text>💰 My Qoins</Text>
                <Icons src={icon} alt='icon' />
                <Qoins>4,500</Qoins>
           </MyQoins>
        </MainAppBar>
    </>)
}

export default HeaderBar;