import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "antd";

import Logout from "../../dashboard/auth/Logout/Logout";

import { Header, Ul, Li } from "../../app/App.styles";

import "./navbar.css";

function Navbar({ themeToggler }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Header
    // backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}
    >
      <Link to="/" className={"logo"}></Link>
      <nav className="navigation-container">
        <Ul>
          {isAuthenticated ? (
            <>
              <Li>
                <Button className={"ant-btn ant-btn-primary"} onClick={themeToggler}>
                  Switch Theme
                </Button>
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

export default Navbar;
