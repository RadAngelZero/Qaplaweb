import React from "react";

import { Button, styled, Typography } from "@mui/material";

import qoins from "../../assets/Qoin.png";

const DeQContainerPayments = styled(Button)({
  borderRadius: "20px",
  maxWidth: "341px",
  minWidth: "341px",
  height: "190px",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  padding: "24px",
})
const ButtonQoins = styled(Button)({
  background: "#141833",
  width: "92px",
  height: "37px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const DeQButtonPayments = ({ backgroundImageUrl, backgroundColor = 'transparent', Qoins, title }) => {
 

  return (
    <div>
      <h1 style={{ fontWeight: "600", fontSize: "22px", textAlign: "start", color: '#FFF' }}>{title}</h1>
      <DeQContainerPayments 
        style={{
          backgroundColor,
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundImagePosition: "center",
        }}
      >
        <ButtonQoins>
          <img style={{ padding: "4px" }} src={qoins} alt="icon" />
          <h2 style={{ weight: "600", fontSize: "18px", color: '#FFF' }}>{Qoins}</h2>
        </ButtonQoins>
      </DeQContainerPayments>
    </div>
  );
};

export default DeQButtonPayments;
