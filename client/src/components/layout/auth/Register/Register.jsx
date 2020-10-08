import { useSelector } from "react-redux";
import React from "react";
import { Link, Redirect } from "react-router-dom";

import RegisterForm from "./RegisterForm/RegisterForm";
import Facebook from "../Login/Facebook/Facebook";
import Google from "../Login/Google/Google";

import { Container, H1, P, Div, Span } from "././../../../app/App.styles";

function Register() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container
      backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}
      style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
    >
      <H1 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Register</H1>
      <Div width={"50vh"}>
        <P>Register Your Account</P>
        <RegisterForm />
        <Link to="/login">Already has an account?</Link>
        <Span>
          <Google />
          <Facebook />
        </Span>
      </Div>
    </Container>
  );
}

export default Register;
