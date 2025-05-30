import { Container, Content, dimensions } from "../helper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  login,
  setAuthorizationToken,
} from "../redux/redux-modules/auth/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Header from "../common/Header";

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  border: none;
  border-bottom: 1px solid #a7a7a7;
  padding: 8px;
  font-size: 16px;

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

const CustomContent = styled(Content)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 400px);
`;

const FormContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const Button = styled.button`
  margin: 30px auto;
  display: block;
  padding: 12px 36px;
  border: none;
  background: ${({ theme }) => theme.darkGradient};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const ProblemContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  p {
    width: 100%;
    text-align: right;
    margin: 0px;
  }

  a {
    font-weight: bold;
    color: black;
  }
`;

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const submitForm = () => {
    props
      .login({ email: email, password: password })
      .then((res) => {
        const token = res.value.data.token;
        localStorage.setItem("token", token);
        setAuthorizationToken(token);
      })
      .catch((err) => warning(err.response.data.error));
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated]);

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  return (
    <Container>
      {contextHolder}
      <Header height="350px" background="/assets/images/default_header.jpg" />
      <CustomContent>
        <h2>Login to proceed</h2>

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
            <Button type="button" value="submit" onClick={submitForm}>
              {props.loading ? "Loading..." : "SIGN IN"}
            </Button>
          </div>
        </FormContainer>
        <ProblemContainer>
          <p>Problems signing to your account?</p>
          <a href="mailto:icmb@marinebioinvasions.info">Contact us</a>
        </ProblemContainer>
      </CustomContent>
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
    setAuthorizationToken: (token) => dispatch(setAuthorizationToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
