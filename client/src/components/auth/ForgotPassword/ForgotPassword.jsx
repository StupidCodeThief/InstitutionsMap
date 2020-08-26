import React from "react";
import { Link } from "react-router-dom";

import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <>
      <h2>Recovery password</h2>
      <p>Enter your email address used for registration</p>
      <ForgotPasswordForm />
      Do not have an account <Link to="/register">register now!</Link>
    </>
  );
}

export default ForgotPassword;
