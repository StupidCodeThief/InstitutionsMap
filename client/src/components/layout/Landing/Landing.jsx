import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./landing.css";

function Landing({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>Landing page</>;
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Landing);
