import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FacebookLogin from "react-facebook-login";

import { addLoginType } from "../../../../../actions/auth";

function AddFacebook() {
  const dispatch = useDispatch();

  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);
  const responseFacebook = (response) => {
    dispatch(addLoginType(response, "facebook"));
  };

  return (
    <>
      <h2 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Add Facebook account</h2>
      <FacebookLogin
        appId="2769260053317770"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass={"ant-btn ant-btn-primary"}
        textButton={"Add Facebook account"}
      />
    </>
  );
}

export default AddFacebook;
