import React from "react";
import { Button, styled, Typography } from "@mui/material";

const DeQContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "165px",
  minWidth:"165px",
  height: "165px",
  borderRadius: "20px"
});

const Title = styled(Typography)({
  color:'#FFFFFF',
  fontWeight:'600'
});

const DeQButton = ({ imagen, background, title, onClick }) => {
  return (
    <DeQContainer onClick={onClick} style={{
      backgroundImage: `url("${background}")`,
      background: background
    }}>
      <img src={imagen} alt="imagen" />
      <Title>
        {title}
      </Title>
    </DeQContainer>
  );
};

export default DeQButton;
