import React from "react";

import qoins from "../../assets/Qoin.png";

const DeQButtonPayments = ({ background, Qoins, title }) => {
  return (
    <div>
      <h1 style={{ fontWeight: "600", fontSize: "22px", textAlign: "start" }}>{title}</h1>
      <div
        style={{
          borderRadius: "20px",
          maxWidth: "341px",
          minWidth: "293px",
          height: "140px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          padding: "24px",
          backgroundImage: `url("${background}")`,
          backgroundImagePosition: "center",
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
          <img style={{ padding: "5px" }} src={qoins} alt="icon" />
          <h2 style={{ weight: "600", fontSize: "18px" }}>{Qoins}</h2>
        </div>
      </div>
    </div>
  );
};

export default DeQButtonPayments;
