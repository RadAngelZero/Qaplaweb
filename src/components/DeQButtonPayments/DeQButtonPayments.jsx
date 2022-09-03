import React from "react";


import qoins from "../../assets/Qoin.png"


const DeQButtonPayments = ({ background }) => {

  return (
    <div
      style={{
        borderRadius: "20px",
        maxWidth: "341px",
        minWidth: "341px",
        height: "190px",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        padding: "24px",
        backgroundImage: `url("${background}")`
      }}
    >
      <div
        style={{
          background: "#141833",
          width: "92px",
          height: "37px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <img style={{padding:'5px'}} src={qoins} alt='icon'/>
        <h2>200</h2>
      </div>
    </div>
  );
};

export default DeQButtonPayments;
