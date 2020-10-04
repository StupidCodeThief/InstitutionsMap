import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Button, Switch } from "antd";

import { uiTheme } from "../../../actions/uiTheme";

import Logout from "../../dashboard/auth/Logout/Logout";

import { Header, Ul, Li } from "../../app/App.styles";

import "./navbar.css";

function Navbar({ isAuthenticated }) {
  const dispatch = useDispatch();

  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  const onChange = () => {
    console.log("Theme changed");
    dispatch(uiTheme());
  };

  return (
    <Header backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}>
      <Link to="/" className={"logo"}></Link>
      <nav className="navigation-container">
        <Ul>
          {isAuthenticated ? (
            <>
              <Li>
                <Switch onChange={onChange} />
              </Li>
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
