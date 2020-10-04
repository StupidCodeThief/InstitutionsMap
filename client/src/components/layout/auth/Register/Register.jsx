import { connect } from "react-redux";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import RegisterForm from "./RegisterForm/RegisterForm";
import Facebook from "../Login/Facebook/Facebook";
import Google from "../Login/Google/Google";

import { Container, H1, P, Div, Span } from "././../../../app/App.styles";

function Register({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container backgroundColor={"white"}>
      <H1>Register</H1>
      <Div width={"50vh"}>
        <P>Register Your Account</P>
        <RegisterForm />
        <Span>
          <Google />
          <Facebook />
        </Span>
        <Link to="/login">Already has an account?</Link>
      </Div>
    </Container>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Register);
