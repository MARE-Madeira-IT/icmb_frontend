import React, { useEffect } from "react";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  setHasAction,
  setHasClickedAction,
} from "../redux/redux-modules/application/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSpeaker } from "../redux/redux-modules/speaker/actions";
import dayjs from "dayjs";
import { updateSelfCalendar } from "../redux/redux-modules/calendar/actions";
import { createChat } from "../redux/redux-modules/chat/actions";

const Header = styled.section`
  height: 50vh;
  position: relative;
  padding: 0px 20px;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 30%
    );
    width: 100%;
    height: 100%;
    z-index: -1;
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

    .back {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
`;

const Info = styled.section`
  p {
    font-size: 14px;
    margin: 0px;
  }

  h3,
  h4 {
    margin: 20px 0px 10px 0px;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 5px;

  .social {
    background-color: #e8e8e8;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    img {
      width: 50%;
    }
  }
`;

const ProgramEntry = styled.div`
  padding: 20px 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;

  .datetime {
    padding: 0px 20px;
    box-sizing: border-box;
    border-right: 1px solid #e1e1e1;
    opacity: 0.8;

    p {
      margin: 0px;
      font-size: 14px;
    }
  }

  .info {
    padding: 0px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    button {
      cursor: pointer;
      background-color: transparent;
      border: 0px;
      box-shadow: 0px;

      img {
        width: 25px;
        height: 25px;
      }
    }

    .title {
      h3,
      p {
        margin: 0px;
      }

      h3 {
        font-size: 16px;
      }
    }
  }
`;

const socialNetworks = [
  "facebook",
  "instagram",
  "linkedin",
  "website",
  "spotify",
  "x",
  "youtube",
  "tiktok",
];

function Speaker(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    props.setHasAction(true);
    if (props.hasClickedAction) {
      props.createChat({ user_id: props.speaker.user_id }).then((response) => {
        navigate("/chats/" + response.action.payload.data.data.id);
      });

      props.setHasClickedAction(false);
    }
  }, [props.hasClickedAction]);

  useEffect(() => {
    props.fetchSpeaker(id);
  }, []);

  return (
    <Container>
      <Header>
        <img className="background" src={props.speaker.image} alt="" />

        <Link to="/speakers" className="navbar">
          <img className="back" src="/assets/icons/back.svg" alt="icmb logo" />
        </Link>
      </Header>

      <Content>
        <Info>
          <h3>{props.speaker.name}</h3>
          <p>
            {props.speaker.role} @ {props.speaker.institution}
          </p>

          <h4>About</h4>
          <p>{props.speaker.description}</p>

          <h4>Social Networks</h4>
          <SocialContainer>
            {socialNetworks.map((currentSocial) => (
              <div key={currentSocial}>
                {props.speaker[currentSocial] && (
                  <a
                    className="social"
                    href={props.speaker[currentSocial]}
                    target="__blank"
                  >
                    <img
                      src={"/icons/social_media/" + currentSocial + ".png"}
                      alt={currentSocial}
                    />
                  </a>
                )}
              </div>
            ))}
          </SocialContainer>

          <h4>Sessions</h4>
          {props?.speaker?.id &&
            props?.speaker?.calendars.map((session) => (
              <ProgramEntry key={session.id} className="content">
                <div className="datetime">
                  <p>{dayjs(session.date).format("MMM DD")}</p>
                  <p>{dayjs(session.from).format("H:mm A")}</p>
                  <p>{dayjs(session.to).format("H:mm A")}</p>
                </div>
                <div className="info">
                  <div className="title">
                    <h3>{session.title}</h3>
                    <p>{session.room}</p>
                  </div>
                  <button>
                    <img
                      onClick={() => props.updateSelfCalendar(session.id)}
                      src={
                        session.my_schedule
                          ? "/icons/program_schedule.svg"
                          : "/icons/program_add.svg"
                      }
                      alt=""
                    />
                  </button>
                </div>
              </ProgramEntry>
            ))}
        </Info>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    hasClickedAction: state.application.hasClickedAction,
    speaker: state.speaker.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelfCalendar: (id) => dispatch(updateSelfCalendar(id)),
    fetchSpeaker: (id) => dispatch(fetchSpeaker(id)),
    setHasAction: (value) => dispatch(setHasAction(value)),
    setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    createChat: (data) => dispatch(createChat(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speaker);
