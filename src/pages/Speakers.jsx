import React, { useEffect } from "react";
import Header from "../common/Header";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSpeakers } from "../redux/redux-modules/speaker/actions";

const SpeakerList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 20px auto;
  gap: 50px;
`;

const Speaker = styled(Link)`
  height: 150px;
  width: 100%;
  text-decoration: none;

  .content {
    height: 100%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    position: relative;
    justify-content: ${(props) => (props.iseven ? "start" : "end")};

    .speaker_photo {
      position: relative;
      order: ${(props) => (props.iseven ? 1 : 3)};

      .triangle {
        z-index: -1;
        position: absolute;
        left: ${(props) => (props.iseven ? "0px" : "calc(100% - 102px)")};
        top: 50%;
        transform: ${(props) =>
          props.iseven
            ? "translate(0, -50%)"
            : "translate(0, -50%) scaleX(-1)"};
        height: 100px;
        object-fit: cover;
      }

      .speaker {
        height: 180px;
        filter: grayscale(1);
        margin: ${(props) =>
          props.iseven ? "-30px 0px 0px 25px" : "-30px 25px 0px 0px"};
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-height: 120px;
      order: 2;
      padding: 15px 0px;
      box-sizing: border-box;
      flex: 1;

      h3 {
        font-size: clamp(16px, 3vw, 18px);
        color: #000000;
      }

      h4 {
        flex: 1;
        color: #a5a5a5;
        font-size: clamp(14px, 2vw, 16px);
      }

      p {
        color: #a5a5a5;
        font-size: clamp(12px, 2vw, 14px);
      }

      h3,
      h4,
      p {
        margin: 0;
      }
    }

    .background {
      bottom: 0;
      width: 30%;
      max-height: 140px;
      order: ${(props) => (props.iseven ? 3 : 1)};
      margin-top: auto;
    }
  }
`;

function Speakers(props) {
  useEffect(() => {
    props.fetchSpeakers();
  }, []);

  return (
    <Container>
      <Header hasback hasprofile background="/images/default_header.jpg" />
      <Content>
        <SpeakerList>
          {props.speakers.map((speaker, index) => (
            <Speaker
              to={"/speaker/" + speaker.id}
              iseven={index % 2 == 0}
              key={speaker.id}
            >
              <div className="content">
                <div className="speaker_photo">
                  <img
                    src="/icons/triangle.svg"
                    alt="triangle"
                    className="triangle"
                  />
                  <img
                    src={speaker.secundary_image}
                    alt="speaker photo"
                    className="speaker"
                  />
                </div>

                <div className="info">
                  <h3>{speaker.name}</h3>
                  <h4>{speaker.country}</h4>

                  <p>{speaker.institution}</p>
                </div>

                <img
                  src={"/icons/speaker_background_" + speaker.id + ".svg"}
                  alt="asbtract elements"
                  className="background"
                />
              </div>
            </Speaker>
          ))}
        </SpeakerList>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    speakers: state.speaker.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: () => dispatch(fetchSpeakers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
