import React, { useEffect, useState } from "react";
import Navbar from "./pages/Navbar";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { connect } from "react-redux";
import { dark, light } from "./theme";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setHasAction } from "./redux/redux-modules/application/actions";
import Notification from "./common/Notification";
import { countNotifications } from "./redux/redux-modules/notification/actions";

const actionRoutes = [
  "message-board",
  "speakers",
  "poster-voting",
  "networking-room",
  "sessions",
];
const actionImages = [
  "/assets/icons/message_board.svg",
  "/assets/icons/45connect.svg",
  "/assets/icons/submit.svg",
  "/assets/icons/share.svg",
  "/assets/icons/submit.svg",
];

const Container = styled.div`
  max-width: 720px;
  width: 100%;
  margin: auto;
`;

function Template(props) {
  const [currentActionImage, setCurrentActionImage] = useState("");
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isAuthenticated) {
      navigate("/login");
    }
  }, [props.isAuthenticated]);

  useEffect(() => {
    props.countNotifications();
    let pathname = getCurrentPathWithoutLastPart(location.pathname);
    props.setHasAction(actionRoutes.includes(pathname));
    let hasAction = actionRoutes.includes(pathname);

    if (hasAction) {
      setCurrentActionImage(actionImages[actionRoutes.indexOf(pathname)]);
    }
  }, [location.key]);

  const getCurrentPathWithoutLastPart = (path) => {
    let basename = path.split("/");
    return basename[1];
  };

  return (
    <ThemeProvider theme={props.theme === "light" ? light : dark}>
      <Container>
        <Notification />
        <GlobalStyles />
        <Outlet />
        {location.pathname != "/login" && (
          <Navbar currentActionImage={currentActionImage} />
        )}
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    theme: state.application.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHasAction: (value) => dispatch(setHasAction(value)),
    countNotifications: () => dispatch(countNotifications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
