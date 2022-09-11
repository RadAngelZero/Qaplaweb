import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";

import { ReactComponent as QoinIcon } from './../../assets/icons/Qoin.svg';

const DeQContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minWidth:"165px",
  height: "165px",
  borderRadius: "20px"
});

const Title = styled(Typography)({
  color:'#FFFFFF',
  fontWeight:'600',
});

const QoinsCostContainer = styled(Box)({
  marginTop: 8,
  background: "#141833",
  width: "92px",
  height: "37px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.35)'
});

const QoinsCost = styled(Typography)({
  marginLeft: 4,
  fontWeight: '600',
  fontSize: 18,
  color: '#FFF'
});

const DeQButton = ({ imagen, background, title, onClick, showCost, cost }) => {
  return (
    <DeQContainer onClick={onClick} style={{
      backgroundImage: `url("${background}")`,
      background: background
    }}>
      <img src={imagen} alt="imagen" />
      <Title>
        {title}
      </Title>
      {showCost &&
       <QoinsCostContainer>
        <QoinIcon />
        <QoinsCost>
          {cost}
        </QoinsCost>
       </QoinsCostContainer>
      }
    </DeQContainer>
  );
};

export default DeQButton;
