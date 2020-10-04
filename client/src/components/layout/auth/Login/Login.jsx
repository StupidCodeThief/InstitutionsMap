import { connect } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import LoginForm from "./LoginForm/LoginForm";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

import {Container, H1, P, Div } from "././../../../app/App.styles";

function Login({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container backgroundColor={"white"}>
      <H1>Sign In</H1>
      <Div>
        <P className="lead">Sign into Your Account</P>
        <LoginForm />
        <Google /> <Facebook />
      </Div>
    </Container>
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Login);
