import React from "react";

import Spinner from "../Spinner/Spinner";

import "./preLoading.css";

function PreLoading() {
  return (
    <section className="loading">
      <h1 className="loading-head">Google Map is loading...</h1>
      <Spinner size="large" />
    </section>
  );
}

export default PreLoading;
