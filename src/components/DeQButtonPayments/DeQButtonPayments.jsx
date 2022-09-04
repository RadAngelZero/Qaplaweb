import React from "react";


import { Button, styled, Typography,Box,} from "@mui/material";


import qoins from "../../assets/Qoin.png";



const DeQContainerPaymentsButton = styled(Button)({
  borderRadius: "20px",
  maxWidth: "341px",
  minWidth: "341px",
  height: "190px",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  padding: "24px",
})




const QoinsCostContainer = styled(Box)({

  background: "#141833",
  width: "92px",
  height: "37px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})


export const Title = styled(Typography)({
  fontWeight: "600",
   fontSize: "22px", 
   textAlign: "start",
    color: '#FFF',
    display: 'block',
    lineHeight:'26px',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    paddingTop:'20px'

})


 

  
    const DeQButtonPayments = ({ backgroundImageUrl, backgroundColor = 'transparent', Qoins, title, onClick }) => {

  return (
    <div>
       <Title> 
         {title}
      </Title>
      <DeQContainerPaymentsButton onClick = {onClick}
        style={{
          backgroundColor,
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundImagePosition: "center",
        }}
      >
        <QoinsCostContainer>
          <img style={{ padding: "4px" }} src={qoins} alt="icon" />
          <h1 style={{ weight: "600", fontSize: "18px", color: '#FFF' }}>{Qoins}</h1>
        </QoinsCostContainer>
        </DeQContainerPaymentsButton>
    </div>
  );
};

export default DeQButtonPayments;
