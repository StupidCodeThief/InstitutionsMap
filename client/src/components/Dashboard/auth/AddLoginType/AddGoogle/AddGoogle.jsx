import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { addLoginType } from "../../../../../actions/auth";

import "./AddGoogle.styles.css";

function AddGoogle() {
  const dispatch = useDispatch();

  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  const responseGoogle = (response) => {
    const token = response.tokenId;

    dispatch(addLoginType({ token: token }, "google"));
  };

  return (
    <>
      <h2 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Add Google account</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary btn"}>
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

export default AddGoogle;
