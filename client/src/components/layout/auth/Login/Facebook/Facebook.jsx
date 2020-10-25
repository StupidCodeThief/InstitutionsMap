import React from "react";
import { useDispatch } from "react-redux";

import FacebookLogin from "react-facebook-login";

import { login } from "../../../../../actions/auth";

function Facebook({ t }) {
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    const { name, email = null, picture, id } = response;

    dispatch(login({ name: name, email: email, picture: picture, id: id }, "facebook"));
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass={"ant-btn ant-btn-primary btn"}
      textButton={t("Login with Facebook")}
    />
  );
}

export default Facebook;
