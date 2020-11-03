import React from "react";
import { useDispatch } from "react-redux";

import FacebookLogin from "react-facebook-login";

import { addLoginType } from "../../../../../actions/auth";

function AddFacebook({ t }) {
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    dispatch(addLoginType(response, "facebook"));
  };

  return (
    <>
      <h2>{t("Add Facebook account")}</h2>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass={"ant-btn ant-btn-primary"}
        textButton={t("Add Facebook account")}
      />
    </>
  );
}

export default AddFacebook;
