import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { setHasClickedAction } from "../redux/redux-modules/application/actions";

const actionButtonClip =
  "polygon(0% 0%, calc(50% - 30px) 0%, 50% 30px, calc(50% + 30px) 0%, 100% 0%, 100% 100%, 0% 100%);";
const Container = styled.section`
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 99;
`;

const Menu = styled.div`
  padding: 20px 10px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  background-color: #396eaebf;
  backdrop-filter: blur(3px);
  /* top left, middle left, middle, middle right, top right, bottom right, bottom left */
  /* clip-path: ${(props) =>
    props.hasaction ? actionButtonClip : "none"};    */

  .active::before {
    content: "";
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 0px;
    transform: translate(calc(-50% - 7px), calc(-50% - 7px)); //50% - border
    rotate: 45deg;
    border-radius: 10px 0px;
    width: 40px;
    height: 40px;
    border: 7px solid #fff;

    background-color: ${({ theme }) => theme.secundary};
    margin-bottom: 5px;
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
  color: white;
  font-size: clamp(12px, 2vw, 16px);

  &::before {
    background-image: ${(props) => "url(" + props.image + ")"};
  }

  img {
    width: 20px;
    height: 20px;
    z-index: 3;
    margin-bottom: 10px;
  }
`;

const Action = styled.div`
  position: absolute;
  transform: rotate(45deg);
  /* rotate: 45deg;  */
  top: -40px;
  left: 50%;
  transform-origin: top left;
  border-radius: 10px 0px;
  width: 40px;
  height: 40px;
  border: 7px solid #fff;
  background-color: ${({ theme }) => theme.secundary};
  cursor: pointer;

  img {
    object-fit: cover;
    rotate: 45deg;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`;

function Navbar(props) {
  const handleClassname = ({ isActive, isPending }) => {
    return isPending ? "pending" : isActive ? "active" : "not-active";
  };

  return (
    <Container>
      <Menu hasaction={props.hasAction ? 1 : 0}>
        {props.hasAction && (
          <Action onClick={() => props.setHasClickedAction()}>
            <img src={props.currentActionImage} alt="action image" />
          </Action>
        )}

        <Item
          to="/"
          image="/assets/icons/home_rotate.svg"
          className={handleClassname}
        >
          <img className="icon" src="/assets/icons/home.svg" alt="home" /> Home
        </Item>
        <Item
          to="/program"
          image="/assets/icons/program_rotate.svg"
          className={handleClassname}
        >
          <img
            className="icon"
            src="/assets/icons/program.svg"
            alt="schedule"
          />{" "}
          Program
        </Item>
        <Item
          to="/chats"
          image="/assets/icons/chat_rotate.svg"
          className={handleClassname}
        >
          <img className="icon" src="/assets/icons/chat.svg" alt="chat" /> Chats
        </Item>
        <Item
          to="/support"
          image="/assets/icons/support_rotate.svg"
          className={handleClassname}
        >
          <img className="icon" src="/assets/icons/support.svg" alt="support" />{" "}
          Support
        </Item>
      </Menu>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    hasAction: state.application.hasAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
