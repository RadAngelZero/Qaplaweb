import React from "react";

import { styled, Box, Typography, Button, Backdrop  } from '@mui/material';


const ButtonContainer = styled(Button)({
    width: '560px',
    height: '93px',
    backgroundColor: '#000000',
    backdropFilter: "blur(20px)",
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '10px',
    marginTop:'40px',
    marginLeft: '20px',
    boxShadow:'-10px 10px 0px #3B4BF9'
})
const Text =styled(Typography)({
    fontWeight: '600',
    fontSize: '21px',
    lineHeight: '22px',
    textAlign: 'center',
    letterSpacing: '-0.408px',
    color: '#FFFFFF',
})

const ButtonCards = ({icon, name, boxShadowColor}) =>{
    return (
        <ButtonContainer style={{boxShadow: `-10px 10px 0px ${boxShadowColor}`}} > 
            <div style={{display:'flex', alignItems: 'center', paddingLeft:'18px'}}>
                <img src={icon} alt='icons'/>
           </div>
           <div style={{marginLeft:'125px', alignItems: 'center', width:'200px', justifyContent:'center'}}> 
                <Text>{name}</Text>
            </div>
        </ButtonContainer>
    )
}

export  default ButtonCards;