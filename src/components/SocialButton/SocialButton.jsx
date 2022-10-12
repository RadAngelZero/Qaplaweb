import React, { useEffect } from "react";

import { styled, Box, Typography, Button, Backdrop } from '@mui/material';

import { ReactComponent as ShowArrow } from '../../assets/ShowArrow.svg';

const ButtonContainer = styled(Button)({
    width: '550px',
    height: '93px',
    backgroundColor: '#000000',
    backdropFilter: "blur(20px)",
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '24px',
    marginLeft: '10px',
    boxShadow: '-10px 10px 0px #3B4BF9',
    textTransform: 'none',
    webkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    mozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',         /* Opera/IE 8+ */
})
const Text = styled(Typography)({
    fontWeight: '600',
    fontSize: '21px',
    lineHeight: '22px',
    textAlign: 'center',
    letterSpacing: '-0.408px',
    color: '#FFFFFF',
})

const SocialButton = ({ Icon, name, boxShadowColor, embeddedChildren, link }) => {

    return (
        <ButtonContainer style={{ boxShadow: `-10px 10px 0px ${boxShadowColor}` }} >
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '18px' }}>
                {/* <img src={icon} alt='icons' /> */}
                {Icon}
            </div>
            <div style={{ marginLeft: '125px', alignItems: 'center', width: '200px', justifyContent: 'center' }}>
                <Text>{name}</Text>
            </div>
            {/* <div style={{justifySelf: 'flex-end'}}>
                <ShowArrow />
            </div> */}
        </ButtonContainer>
    )
}

export default SocialButton;