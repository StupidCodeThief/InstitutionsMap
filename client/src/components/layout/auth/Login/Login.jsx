import { useSelector } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm/LoginForm";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

import { Container } from "././../../../app/App.styles";

function Login({ t }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <h1>{t("Sign In")}</h1>
      <div>
        <p className="lead">{t("Sign into Your Account")}</p>
        <LoginForm t={t}/>
        <Google t={t}/> <Facebook t={t}/>
      </div>
    </Container>
  );
}

export default Login;
