import React, { useEffect, useState } from "react";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  setHasAction,
  setHasClickedAction,
  setNotifications,
} from "../redux/redux-modules/application/actions";
import {
  createNetworking,
  fetchNetworkings,
} from "../redux/redux-modules/networking/actions";
import { updateUser } from "../redux/redux-modules/auth/actions";
import { Popconfirm } from "antd";
import ProfileForm from "./NetworkingRoom/ProfileForm";
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

const UserInfo = styled.div`
  .button-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin: 20px 0px;
  }

  button {
    margin-top: 5px;
    background-color: white;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: 0px;
    border: 2px solid;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    border-color: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 10px;
    }
  }

  h3 {
    margin: 0px;
    font-size: clamp(20px, 5vw, 30px);
  }

  h4,
  p {
    margin: 0px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: initial;
  margin: 50px 0px;

  h2 {
    line-height: 100%;
    margin: 0px;
    font-size: clamp(42px, 4vw, 50px);
    font-weight: 500;
    font-family: "Kufam", sans-serif;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

const HiddenPopconfirm = styled.div`
  position: fixed;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
`;

const Message = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 30px;
  border-radius: 6px;

  .header {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
  }

  p {
    margin: 0px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    text-decoration: none;

    button {
      display: flex;
      padding: 6px 12px;
      box-sizing: border-box;
      gap: 5px;
      border-radius: 6px;
      border: 0px;
      background-color: ${({ theme }) => theme.secundary};
      cursor: pointer;

      p {
        color: white;
        text-transform: capitalize;
      }
    }

    .active {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

function NetworkingRoom(props) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  useEffect(() => {
    props.setHasAction(true);
    if (props.hasClickedAction) {
      if (props?.user?.description) {
        setVisible(true);
      } else {
        props.setNotifications({
          notifications: { error: null },
          title: "Set your user about first",
          type: "error",
        });
      }
      props.setHasClickedAction(false);
    }
  }, [props.hasClickedAction]);

  useEffect(() => {
    props.fetchNetworkings();
  }, []);

  const confirm = () => {
    setVisible(false);
    props.createNetworking().catch((err) => {
      props.setNotifications({
        notifications: err.response.data.errors,
        title: "Missing information",
        type: "error",
      });
    });
  };
  const cancel = () => {
    setVisible(false);
  };

  const handleProfileEdit = (values) => {
    let formData = new FormData();

    if (values.image != props.user.image) {
      formData.append("image", values.image);
    }

    formData.append("name", values.name);
    values.role && formData.append("role", values.role);
    values.institution && formData.append("institution", values.institution);
    values.description && formData.append("description", values.description);

    props
      .updateUser(formData)
      .then(() => {
        setFormVisibility(false);
      })
      .catch((err) => {
        props.setNotifications({
          notifications: err.response.data.errors,
          title: "Invalid data",
          type: "error",
        });
      });
  };

  const handleConnect = (user_id) => {
    props.createChat({ user_id: user_id }).then((response) => {
      navigate("/chats/" + response.action.payload.data.data.id);
    });
  };

  return (
    <Container style={{ position: "relative" }}>
      <ProfileForm
        visible={formVisibility}
        submit={handleProfileEdit}
        cancel={() => setFormVisibility(false)}
        user={props.user}
      />
      <Header>
        <img className="background" src={props?.user?.image} alt="" />

        <Link to="/" className="navbar">
          <img className="back" src="/icons/back.svg" alt="icmb logo" />
        </Link>
      </Header>
      <HiddenPopconfirm>
        <Popconfirm
          style={{ width: "300px" }}
          title="You'll share your profile with the community."
          description="You're able to share your profile once every six hours. This action cannot be reverted."
          open={visible}
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        />
      </HiddenPopconfirm>
      <Content>
        {props?.user?.id && (
          <UserInfo>
            <div className="button-container">
              <div>
                <h3>{props.user.name}</h3>
                <p>
                  {props.user.role} @ {props.user.institution}
                </p>
              </div>
              <button onClick={() => setFormVisibility(true)}>
                Edit <img src="/icons/edit.svg" alt="edit icon" />
              </button>
            </div>
            <h4>About</h4>
            <p>
              {props.user.description
                ? props.user.description
                : "You haven't written a description yet."}
            </p>
          </UserInfo>
        )}

        <Title>
          <h2>Connect</h2>
          <img src="/images/networkingroom/title1.png" alt="" />
          <h2>with</h2>
          <h2>the</h2>
          <h2>community</h2>
          <img src="/images/networkingroom/title2.png" alt="" />
        </Title>

        {props.data.map((message) => (
          <Message key={message.id}>
            <div className="header">
              <img src={message.image} alt="" />
              <h4>{message.name}</h4>
            </div>
            <p>{message.description}</p>
            {message.user_id != props.user.id ? (
              <div className="button-container">
                <button
                  onClick={() => handleConnect(message.user_id)}
                  className={message.connected ? "active" : ""}
                >
                  <p>{message.connected ? "connected" : "connect"} </p>
                  <img src="/icons/connect.svg" alt="" />
                </button>
              </div>
            ) : (
              <br />
            )}
          </Message>
        ))}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    hasClickedAction: state.application.hasClickedAction,
    data: state.networking.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
    createChat: (data) => dispatch(createChat(data)),
    fetchNetworkings: () => dispatch(fetchNetworkings()),
    createNetworking: () => dispatch(createNetworking()),
    setHasAction: (value) => dispatch(setHasAction(value)),
    setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    setNotifications: (data) => dispatch(setNotifications(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkingRoom);
