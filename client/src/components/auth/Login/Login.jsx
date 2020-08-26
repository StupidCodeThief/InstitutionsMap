import { connect } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import LoginForm from "./LoginForm/LoginForm";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

function Login({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <div>
        <LoginForm />
        <Google /> <Facebook />
      </div>
    </section>
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Login);
