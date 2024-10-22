import React from 'react'
import styled from 'styled-components';

const Container = styled.section`
    height: 250px;
    position: relative;
    padding: 0px 20px;
    box-sizing: border-box;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: white;
        width: 100%;
        height: 30px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;

        .logo {
            width: 60px;
        }

        .back {
            width: 40px;
            height: 40px;
        }

        .profile {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            object-fit: cover;
        }
    }
`;

function Header(props) {
    return (
        <Container>
            {props.children}

            <img className='background' src={props.background} alt="" />
        </Container>
    )
}

export default Header