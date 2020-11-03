import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { login } from "../../../../../actions/auth";

function Google({ t }) {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    const token = response.tokenId;

    dispatch(login({ token: token }, "google"));
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary btn btn-login"}>
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

export default Google;
