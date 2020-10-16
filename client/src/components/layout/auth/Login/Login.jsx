import { useSelector } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm/LoginForm";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

import { Container, H1, P, Div } from "././../../../app/App.styles";

function Login({ t }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <H1>{t("Sign In")}</H1>
      <Div>
        <P className="lead">{t("Sign into Your Account")}</P>
        <LoginForm t={t}/>
        <Google t={t}/> <Facebook t={t}/>
      </Div>
    </Container>
  );
}

export default Login;
