import { connect } from "react-redux";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import RegisterForm from "./RegisterForm/RegisterForm";
import Facebook from "../Login/Facebook/Facebook";
import Google from "../Login/Google/Google";

function Register({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Register Your Account
      </p>
      <div>
        <RegisterForm />
        <Google /> <Facebook />
      </div>
      <Link to="/login">Already has an account?</Link>
    </section>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Register);