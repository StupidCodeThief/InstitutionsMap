import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "antd";

import Logout from "../../auth/Logout/Logout";

import "./navbar.css";

function Navbar({ isAuthenticated }) {
  return (
    <header className="page-header">
      <Link to="/" className={"logo"}></Link>
      <nav className="navigation-container">
        <ul className="navigation-list">
          {isAuthenticated ? (
            <Logout />
          ) : (
            <>
              <li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/register">Register</Link>
                </Button>
              </li>
              <li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Navbar);
