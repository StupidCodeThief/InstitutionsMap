import { useSelector } from "react-redux";
import React from "react";
import { Link, Redirect } from "react-router-dom";

import RegisterForm from "./RegisterForm/RegisterForm";
import Facebook from "../Login/Facebook/Facebook";
import Google from "../Login/Google/Google";

import { Container } from "././../../../app/App.styles";

import "./register.css";

function Register({ t }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <h1>
        <b>{t("Register")}</b>
      </h1>
      <div>
        <h2>{t("Register Your Account")}</h2>
        <RegisterForm t={t} />
        <Link to="/login">{t("Already has an account?")}</Link>
        <div className={"register-buttons"}>
          <Google t={t} />
          <Facebook t={t} />
        </div>
      </div>
    </Container>
  );
}

export default Register;
