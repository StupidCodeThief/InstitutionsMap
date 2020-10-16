import React from "react";
import { Link } from "react-router-dom";

import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

import { Container } from "././../../../app/App.styles";

function ForgotPassword({ t }) {
  return (
    <Container>
      <h2>{t("Recovery password")}</h2>
      <p>{t("Enter your email address used for registration")}</p>
      <ForgotPasswordForm t={t}/>
      <span>
        {t("Do not have an account?")} <Link to="/register">{t("register now!")}</Link>
      </span>
    </Container>
  );
}

export default ForgotPassword;
