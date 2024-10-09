import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";


const Container = styled.section`
    position: sticky;
    bottom: 0;
    left: 0;
`;

const Menu = styled.div`
    padding: 20px 10px;
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    background-color: #396eaebf;
    backdrop-filter: blur(3px);
    /* top left, middle left, middle, middle right, top right, bottom right, bottom left */
    clip-path: ${props => props.hasAction ? actionButtonClip : ""};   

    .active::before {
        content: "";
        background-repeat: no-repeat;
        background-position: center center;
        /* background: url("/icons/program.svg") center center no-repeat; */
        position: absolute;
        top: 0px;
        transform: translate(calc(-50% - 7px), calc(-50% - 7px)); //50% - border
        rotate: 45deg; 
        border-radius: 10px 0px;
        width: 40px;
        height: 40px;
        border: 7px solid #fff;
        background-color: ${({ theme }) => theme.secundary}; 
    }

    .active {
        .icon {
            display: none;
        }
    }
    
`;

const Item = styled(NavLink)`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    text-decoration: none;

    &::before {
        background-image: ${(props) => "url(" + props.image + ")"};
    }

    img {
        width: 20px;
        height: 20px;
        z-index: 3;
        margin-bottom: 10px;
    }

    p {
        color: white;
        font-size: clamp(12px, 2vw, 16px);
        
    }
`;



function Navbar(props) {
    const { isAuthenticated } = props;

    const handleClassname = ({ isActive, isPending }) => {
        return isPending ? "pending" : isActive ? "active" : "not-active"
    }


    return (
        <Container>
            <Menu hasAction={false}>
                <Item to="/"
                    image="/icons/home_rotate.svg"
                    className={handleClassname}
                >
                    <img className='icon' src="/icons/home.svg" alt="home" />
                    <p>Home</p>
                </Item>
                <Item to="/program"
                    image="/icons/program_rotate.svg"
                    className={handleClassname}
                >
                    <img className='icon' src="/icons/program.svg" alt="schedule" />
                    <p>Program</p>
                </Item>
                <Item to="/chats"
                    image="/icons/chat_rotate.svg"
                    className={handleClassname}
                >
                    <img className='icon' src="/icons/chat.svg" alt="chat" />
                    <p>Chats</p>
                </Item>
                <Item to="/support"
                    image="/icons/support_rotate.svg"
                    className={handleClassname}
                >
                    <img className='icon' src="/icons/support.svg" alt="support" />
                    <p>Support</p>
                </Item>
            </Menu>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, null)(Navbar);