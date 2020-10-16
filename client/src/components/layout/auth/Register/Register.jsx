import { useSelector } from "react-redux";
import React from "react";
import { Link, Redirect } from "react-router-dom";

import RegisterForm from "./RegisterForm/RegisterForm";
import Facebook from "../Login/Facebook/Facebook";
import Google from "../Login/Google/Google";

import { Container, H1, P, Div, Span } from "././../../../app/App.styles";

function Register({ t }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <H1>{t("Register")}</H1>
      <Div width={"50vh"}>
        <P>{t("Register Your Account")}</P>
        <RegisterForm t={t} />
        <Link to="/login">{t("Already has an account?")}</Link>
        <Span>
          <Google t={t} />
          <Facebook t={t} />
        </Span>
      </Div>
    </Container>
  );
}

export default Register;
