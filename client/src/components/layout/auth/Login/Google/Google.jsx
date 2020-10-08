import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { login } from "../../../../../actions/auth";

import "./Google.styles.css"

function Google({ login }) {
  const responseGoogle = (response) => {
    const token = response.tokenId;
    
    login({ token: token }, "google");
  };

  return (
    <>
      <GoogleLogin
        clientId="413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary btn"}>
            LogIn with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

Google.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Google);

