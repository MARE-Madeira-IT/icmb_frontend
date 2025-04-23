import React from "react";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

function Voting() {
  const navigate = useNavigate();

  const onScanSuccess = (result) => {
    if (result) {
      navigate(result.text.replace("https://icmb.wave-labs.org", ""));
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
