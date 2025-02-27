import { Container, dimensions } from "../helper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  login,
  setAuthorizationToken,
} from "../redux/redux-modules/auth/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Input = styled.input`
  width: 60%;
  box-sizing: border-box;
  margin: 15px 0;
  border: none;
  border-bottom: 2px solid #777;
  padding: 8px;

  &:focus,
  &:active {
    outline: none;
    border: none;
    border-bottom: 2px solid red;
    background-color: white !important;
    appearance: none;
  }

  ::placeholder {
    font-size: 16px;
    display: inline-block;
    margin-left: 10px;
  }
`;

const FormContainer = styled.div`
  z-index: 1;
  position: relative;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 50%;
  max-width: 500px;
  min-width: 120px;
  min-height: 500px;
  display: block;
  padding: 20px;
  background: blue;
  position: relative;
  box-shadow: 0px 0px 24px #0000005a;

  @media (max-width: ${dimensions.lg}) {
    width: 70%;
  }

  @media (max-width: ${dimensions.md}) {
    width: 90%;
  }

  @media (max-width: ${dimensions.sm}) {
    width: 100%;
  }

  .screen__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    -webkit-clip-path: inset(0 0 0 0);
    clip-path: inset(0 0 0 0);
  }

  .screen__background__shape {
    transform: rotate(45deg);
    position: absolute;
    height: 520px;
    width: 520px;
    background: #fff;
    top: -50px;
    right: 180px;
    border-radius: 0 72px 0 0;
  }
`;

const Button = styled.button`
  margin-top: 30px;
  display: block;
  padding: 10px 26px;
  border: none;
  background: blue;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: lightblue;
  }
`;

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const submitForm = () => {
    props.login({ email: email, password: password });
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated]);

  return (
    <Container>
      <Card>
        <FormContainer>
          <div>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={submitForm}>
              {props.loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </FormContainer>
        <div className="screen__background">
          <span className="screen__background__shape"></span>
        </div>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
