import React from "react";


const DeQButton = ({ imagen, background, Title, }) => {
  return (
    <div
      style={{
        background: background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "165px",
        height: "165px",
        borderRadius: "20px",
      }}
    >
      <img src={imagen} alt="imagen" />
      <h1 style={{margin:'1px', color:'#FFFFFF', fontSize:'18px', fontWeight:'600'}}>{Title}</h1>
    </div>
  );
};

export default DeQButton;
