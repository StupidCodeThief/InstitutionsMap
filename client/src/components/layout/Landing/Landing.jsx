import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./landing.css";

function Landing() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <></>;
}

export default Landing;
