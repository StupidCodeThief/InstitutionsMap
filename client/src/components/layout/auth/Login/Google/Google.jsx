import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { login } from "../../../../../actions/auth";

import "./Google.styles.css";

function Google({ login, t }) {
  const responseGoogle = (response) => {
    const token = response.tokenId;

    login({ token: token }, "google");
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary btn"}>
            {t("Login with Google")}
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
  login: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Google);
