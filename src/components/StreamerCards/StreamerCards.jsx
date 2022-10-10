import React from "react";

import { styled, Box, Typography, Button  } from '@mui/material';

import iconCalendar from "../../assets/icons/iconCalendar.svg"
import iconsReloj from "../../assets/icons/reloj.svg"
import { typography } from "@mui/system";

const ContainerCards = styled(Box)({
    marginTop:'40px',
    marginLeft:'60px'
});
const ImageBackground = styled(Button)({
    width:'340px',
    height:'191px',
    borderRadius: '20px'
})

const Title = styled(Typography)({
    maxWidth: '265px',
    height: '42px',
    left: '2px',
    top: '207px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.35px',
    color: '#FFFFFF',
    marginTop:'12px',
    marginBottom:'10px'
})
const Img = styled('img')({
    paddingRight:'5px'
})

const Containerdate = styled(Box)({
    display: 'flex',
})
const Text = styled(Typography)({
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '26px',
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF'
})

const StreamerCards = ({backgroundImage, titleCad ,streamDay, day, streamHou, hourSuffix }) =>{
    return( 
         <ContainerCards>
                <ImageBackground style={{backgroundImage: `url("${backgroundImage}")`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}/>
                <Title>
                    {titleCad}
                </Title>
                <Containerdate> 
                    <div style={{ display: 'flex', marginRight:'8px'}}> 
                        <Img src={iconCalendar} alt='icon'/>
                        <Text>{streamDay}</Text>
                        <Text>{day}</Text>
                    </div>
                    <div style={{ display: 'flex', marginRight:'8px'}}> 
                        <Img src={iconsReloj} alt='icon'/>
                        <Text>{streamHou}</Text>
                        <Text>{hourSuffix}</Text>
                    </div>
                </Containerdate>
         </ContainerCards>
    )
}

export default StreamerCards;