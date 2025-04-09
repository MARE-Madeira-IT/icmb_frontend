import React, { useEffect } from "react";
import { Container, Content } from "../helper";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Badge, Col, Row } from "antd";
import Header from "../common/Header";
import { countNotifications } from "../redux/redux-modules/notification/actions";
import { connect } from "react-redux";

const NavItem = styled(Col)`
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "150px")};
  position: relative;
  margin-bottom: 20px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    background-image: ${(props) => "url(" + props.background + ")"};
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    color: white;

    h3,
    p {
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

const CustomBadge = styled(Badge)`
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "150px")};
  position: relative;
  margin-bottom: 20px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    background-image: ${(props) => "url(" + props.background + ")"};
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    color: white;

    h3,
    p {
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

function Homepage(props) {
  return (
    <Container>
      <Header haslogo hasprofile background="/images/default_header.jpg" />

      <Content>
        <Row gutter={16}>
          <Col span={24}>
            <CustomBadge
              background="/images/alert_board.jpg"
              count={props.notificationCounter}
            >
              <Link to="/alert-board">
                <h3>Alert board</h3>
                <p>Conference alerts & notifications</p>
              </Link>
            </CustomBadge>
          </Col>

          <Col span={12}>
            <Row gutter={16}>
              <NavItem background="/images/networking_room.jpg" md={24} sm={24}>
                <Link to="/networking-room">
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
          <NavItem
            background="/images/community_vote.jpg"
            height={320}
            span={12}
          >
            <Link to="/voting">
              <h3>Community Vote</h3>
              <p>Evaluate posters and sessions</p>
            </Link>
          </NavItem>
          <NavItem background="/images/venue.jpg" height={320} span={12}>
            <Link to="/venue">
              <h3>Venue</h3>
              <p>Get to know Madeira Island</p>
            </Link>
          </NavItem>
          <Col span={12}>
            <Row gutter={16}>
              <NavItem background="/images/sponsors.jpg" md={24} sm={24}>
                <Link to="/sponsors">
                  <h3>Sponsors</h3>
                  <p>Entities that support us</p>
                </Link>
              </NavItem>
              <NavItem background="/images/speakers.jpg" md={24} sm={24}>
                <Link to="/speakers">
                  <h3>Keynote Speakers</h3>
                  <p>Know the public speakers of ICMB</p>
                </Link>
              </NavItem>
            </Row>
          </Col>
          <NavItem background="/images/resources_media.jpg" span={24}>
            <Link to="/resources">
              <h3>Resources & Media</h3>
              <p>Access to the digital content in the conference </p>
            </Link>
          </NavItem>
        </Row>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    notificationCounter: state.notification.counter,
  };
};

export default connect(mapStateToProps, null)(Homepage);
