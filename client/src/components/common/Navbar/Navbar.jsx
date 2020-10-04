import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "antd";

import Logout from "../../dashboard/auth/Logout/Logout";

import { Header, Ul, Li } from "../../app/App.styles";

import "./navbar.css";

function Navbar({ isAuthenticated }) {
  return (
    <Header backgroundColor={"#ebedf0"}>
      <Link to="/" className={"logo"}></Link>
      <nav className="navigation-container">
        <Ul>
          {isAuthenticated ? (
            <>
              <Li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/user/profile">Profile</Link>
                </Button>
              </Li>
              <Li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/add-login-type">Add Account</Link>
                </Button>
              </Li>
              <Li>
                <Logout />
              </Li>
            </>
          ) : (
            <>
              <Li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/register">Register</Link>
                </Button>
              </Li>
              <Li>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/login">Login</Link>
                </Button>
              </Li>
            </>
          )}
        </Ul>
      </nav>
    </Header>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Navbar);
