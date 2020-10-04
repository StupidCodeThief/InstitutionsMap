import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

import { Container } from "././../../../app/App.styles";

function ForgotPassword() {
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  return (
    <Container
      style={{ color: isThemeDArk ? "#fff" : "#27292D", backgroundColor: isThemeDArk ? "#27292D" : "#ebedf0" }}
    >
      <h2 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Recovery password</h2>
      <p>Enter your email address used for registration</p>
      <ForgotPasswordForm />
      Do not have an account <Link to="/register">register now!</Link>
    </Container>
  );
}

export default ForgotPassword;
