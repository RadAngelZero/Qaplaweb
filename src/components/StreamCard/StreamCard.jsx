import React from "react";

import { styled, Box, Typography, Button  } from '@mui/material';

import iconCalendar from "../../assets/icons/iconCalendar.svg"
import iconsReloj from "../../assets/icons/reloj.svg"
import { typography } from "@mui/system";

const ContainerCards = styled(Box)({
    // display: 'flex',
    marginBottom: '55px',
});
const ImageBackground = styled(Button)({
    width:'340px',
    height:'190px',
    borderRadius: '20px',
})

const Title = styled(Typography)({
    overflow: 'hidden',
    maxWidth: '340px',
    maxHeight: '42px',
    left: '2px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.35px',
    color: '#FFFFFF',
    marginTop:'16px',
    marginBottom:'16px',
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
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
})

const StreamCard = ({backgroundImage, title , wDay, day, hour, hourSuffix }) =>{
    return( 
         <ContainerCards>
                <ImageBackground style={{backgroundImage: `url("${backgroundImage}")`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}/>
                <Title>
                    {title}
                </Title>
                <Containerdate> 
                    <div style={{ display: 'flex', marginRight:'8px'}}> 
                        <Img src={iconCalendar} alt='icon'/>
                        <Text>{wDay}</Text>
                        <Text style={{marginLeft: '6px'}}>{day}</Text>
                    </div>
                    <div style={{ display: 'flex', marginRight:'8px'}}> 
                        <Img src={iconsReloj} alt='icon'/>
                        <Text>{hour}</Text>
                        <Text>{hourSuffix}</Text>
                    </div>
                </Containerdate>
         </ContainerCards>
    )
}

export default StreamCard;