import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-scanner";
import { Container } from "../helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Voting() {
  const navigate = useNavigate();

  const onScanSuccess = (result) => {
    if (result) {
      var searchParams = new URLSearchParams(result.text.split("?")[1]);

      navigate(
        "/" + searchParams.get("type") + "-voting/" + searchParams.get("id")
      );
    }
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  return (
    <QrReader
      className="teste"
      delay={1000}
      style={{
        height: "100vh",
        width: "100vw",
        objectFit: "cover",
      }}
      facingMode="rear"
      onError={onScanFail}
      onScan={onScanSuccess}
    />
  );
}

export default Voting;
