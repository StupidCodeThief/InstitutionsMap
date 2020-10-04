import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { addLoginType } from "../../../../../actions/auth";

function AddGoogle({ addLoginType }) {
  const responseGoogle = (response) => {
    const token = response.tokenId;

    addLoginType({ token: token }, "google");
  };
  return (
    <>
      <h2>Add Google account</h2>
      <GoogleLogin
        clientId="413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary"}>
            Add Google account
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

AddGoogle.propTypes = {
  addLoginType: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addLoginType
};

export default connect(null, mapDispatchToProps)(AddGoogle);
