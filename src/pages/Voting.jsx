import React, { useEffect, useRef, useState } from 'react'
import QrReader from 'react-qr-scanner'
import { Container } from '../helper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


function Voting() {
    const [scannedResult, setScannedResult] = useState("");
    const navigate = useNavigate();

    const onScanSuccess = (result) => {
        console.log(result);
        if (result) {
            navigate("/poster-voting");
        }

    };

    const onScanFail = (err) => {
        console.log(err);
    };

    return (
        <Container>
            <QrReader
                className="teste"
                delay={1000}
                style={{
                    height: "100vh",
                    width: "100vw",
                    objectFit: "cover"
                }}
                facingMode="rear"
                onError={onScanFail}
                onScan={onScanSuccess}
            />
        </Container>
    )
}


export default Voting