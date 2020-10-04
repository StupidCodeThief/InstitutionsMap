import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FacebookLogin from "react-facebook-login";

import { addLoginType } from "../../../../../actions/auth";

function AddFacebook({ addLoginType }) {
  const responseFacebook = (response) => {
    addLoginType(response, "facebook");
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

AddFacebook.propTypes = {
  addLoginType: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addLoginType
};

export default connect(null, mapDispatchToProps)(AddFacebook);
