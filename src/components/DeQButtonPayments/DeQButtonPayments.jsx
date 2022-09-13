import React from "react";


import { Button, styled, Typography,Box,} from "@mui/material";


import { ReactComponent as QoinIcon } from "../../assets/icons/Qoin.svg";



const DeQContainerPaymentsButton = styled(Button)({
  borderRadius: "20px",
  maxWidth: "348px",
  minWidth: "348px",
  height: "190px",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  padding: "24px",
  marginRight:'10px'
})

const QoinsCostContainer = styled(Box)({
  background: "#141833",
  width: "92px",
  height: "37px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.35)'
})

export const Title = styled(Typography)({
    fontWeight: "600",
    fontSize: "22px", 
    textAlign: "start",
    color: '#FFF',
    display: 'block',
    lineHeight:'26px',
    marginBlockEnd: '0.67em',
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
          <QoinIcon style={{ padding: "4px" }} />
          <h1 style={{ weight: "600", fontSize: "18px", color: '#FFF' }}>{Qoins}</h1>
        </QoinsCostContainer>
        </DeQContainerPaymentsButton>
    </div>
  );
};

export default DeQButtonPayments;
