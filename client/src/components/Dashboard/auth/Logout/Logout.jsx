import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";

import { logout } from "../../../../actions/auth";

function Logout({ logout, t }) {
  const onClick = () => {
    logout();
  };
  return (
    <Button onClick={onClick} className={"ant-btn ant-btn-default"}>
      {t("Logout")}
    </Button>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logout
};

export default connect(null, mapDispatchToProps)(Logout);
