import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FacebookLogin from "react-facebook-login";

import { login } from "../../../../../actions/auth";

function Facebook({ login }) {
  const responseFacebook = (response) => {
    const { name, email = null, picture, id } = response;

    login({ name: name, email: email, picture: picture, id: id }, "facebook");
  };

  return (
    <FacebookLogin
      appId="2769260053317770"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass={"ant-btn ant-btn-primary"}
    />
  );
}

Facebook.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Facebook);
