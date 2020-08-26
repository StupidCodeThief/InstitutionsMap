import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Alert } from "antd";

function CustomAlert({ alerts }) {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return <Alert key={alert.id} message={alert.msg} type={alert.alertType} />;
    })
  );
}

CustomAlert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps, null)(CustomAlert);
