import { useSelector } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm/LoginForm";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

import { Container, H1, P, Div } from "././../../../app/App.styles";

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <H1>Sign In</H1>
      <Div>
        <P className="lead">Sign into Your Account</P>
        <LoginForm />
        <Google /> <Facebook />
      </Div>
    </Container>
  );
}

export default Login;
