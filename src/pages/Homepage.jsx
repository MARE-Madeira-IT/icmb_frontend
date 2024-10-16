import React from 'react'
import { Container } from '../helper'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Header = styled.section`
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

const Content = styled.section`
    padding: 0px 20px;
    box-sizing: border-box;
    margin-bottom: 50px;
`;

const NavItem = styled(Col)`
    width: 100%;
    height: ${props => props.height ? props.height + "px" : "150px"};
    position: relative;
    margin-bottom: 20px;

    a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        background-image: ${props => "url(" + props.background + ")"};
        background-position: center;
        background-size: cover;
        border-radius: 8px;
        padding: 10px;
        box-sizing: border-box;
        color: white;

        h3, p {
            margin: 0;
        }

        h3 {
            font-size: clamp(14px, 1.5vw, 16px);
        }

        p {
            font-size: clamp(12px, 1.5vw, 14px);
        }
    }
`;

function Homepage() {

    return (
        <Container>
            <Header>
                <div className='navbar'>
                    <img className='logo' src="/logo.png" alt="icmb logo" />
                    <img className='profile' src="/profile.jpg" alt=" profile pic" />
                </div>
                <img className='background' src="/images/header.jpg" alt="" />
            </Header>
            <Content>
                <Row gutter={16}>
                    <NavItem background="/images/alert_board.jpg" span={24}>
                        <Link to="/message-board">
                            <h3>Alert board</h3>
                            <p>Conference alerts & notifications</p>
                        </Link>
                    </NavItem>
                    <Col span={12}>
                        <Row gutter={16}>
                            <NavItem background="/images/networking_room.jpg" md={24} sm={24}>
                                <Link to="/message-board">
                                    <h3>Networking Room</h3>
                                    <p>Connect at ICMB</p>
                                </Link>
                            </NavItem>
                            <NavItem background="/images/message_board.jpg" md={24} sm={24}>
                                <Link to="/message-board">
                                    <h3>Message Board</h3>
                                    <p>Share your experience</p>
                                </Link>
                            </NavItem>
                        </Row>
                    </Col>
                    <NavItem background="/images/community_vote.jpg" height={320} span={12} >
                        <Link to="/message-board">
                            <h3>Community Vote</h3>
                            <p>Evaluate posters and sessions</p>
                        </Link>
                    </NavItem>
                    <NavItem background="/images/venue.jpg" height={320} span={12} >
                        <Link to="/message-board">
                            <h3>Venue</h3>
                            <p>Get to know Madeira Island</p>
                        </Link>
                    </NavItem>
                    <Col span={12}>
                        <Row gutter={16}>
                            <NavItem background="/images/sponsors.jpg" md={24} sm={24}>
                                <Link to="/message-board">
                                    <h3>Sponsors</h3>
                                    <p>Entities that support us</p>
                                </Link>
                            </NavItem>
                            <NavItem background="/images/speakers.jpg" md={24} sm={24}>
                                <Link to="/message-board">
                                    <h3>Keynote Speakers</h3>
                                    <p>Know the public speakers of ICMB</p>
                                </Link>
                            </NavItem>
                        </Row>
                    </Col>
                    <NavItem background="/images/resources_media.jpg" span={24}>
                        <Link to="/message-board">
                            <h3>Resources & Media</h3>
                            <p>Access to the digital content in the conference </p>
                        </Link>
                    </NavItem>
                </Row>
            </Content>


        </Container >
    )
}

export default Homepage