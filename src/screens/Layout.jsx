import React from "react";

import DeQButton from "../components/DeQButton/DeQButton";
import DeQButtonGroup from "../components/DeQButtonPayments/DeQButtonPayments";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import DeQButtonPayments from "../components/DeQButtonPayments/DeQButtonPayments";

import iconEstrella from "../assets/IconEstrella.png";
import ellipse from "../assets/Ellipse.png";

import prop from "../Data";
import { propPagos } from "../Data";

const Layout = () => {
  
  return (
    <div>
      <h1 style={{ textAlign: "start", fontSize: "22px", fontWeight: "600" }}>
        Custom Reaction{" "}
        <img
          style={{ width: "20px", height: "20px" }}
          src={ellipse}
          alt="icon"
        />
      </h1>
      <div
        style={{
          maxWidth: "138px",
          height: "36px",
          backgroundColor: "#1C1E64",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "10px",
        }}
      >
        <img
          style={{ width: "14px", height: "14px", padding: "3px" }}
          src={iconEstrella}
          alt="icon"
        />
        <p style={{ fontWeight: "500", fontSize: "16px" }}>(5) Ractions </p>
      </div>
      <Box>
        <Grid container gap={3}>
          {prop.map((elemento) => (
            <DeQButton
              Title={elemento.Title}
              imagen={elemento.imagen}
              background={elemento.background}
            />
          ))}
        </Grid>
        <div>
          <Grid container gap={3}>
            {propPagos.map((el) => (
              <DeQButtonPayments
                background={el.background}
                Qoins={el.Qoins}
                title={el.title}
              />
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default Layout;
