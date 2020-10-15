import React from "react";
import { useDispatch } from "react-redux";

import FacebookLogin from "react-facebook-login";

import { addLoginType } from "../../../../../actions/auth";

function AddFacebook() {
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    dispatch(addLoginType(response, "facebook"));
  };

  return (
    <>
      <h2>Add Facebook account</h2>
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
