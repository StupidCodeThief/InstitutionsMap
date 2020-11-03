import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Radio } from "antd";
import { Drawer, List, NavBar, Icon } from "antd-mobile";

import Logout from "../../Dashboard/auth/Logout/Logout";

import { DivWithTheme, Header } from "./Navbar.styles";

import "./navbar.css";

function Navbar({ themeToggler, languageToggler, t, language, isMobile }) {
  const [isOpen, setOpen] = useState(false);

  const onOpenChange = () => {
    setOpen(!isOpen);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (e) => {
    switch (e.target.value) {
      case "en":
        languageToggler("en-EN");
        break;
      case "ru":
        languageToggler("ru-RU");
        break;
      default:
        break;
    }
  };

  const sidebar = (isAuthenticated) => {
    return isAuthenticated ? (
      <List>
        <List.Item>
          <h3> {t("Language")}</h3>
          <Radio.Group onChange={onChange} defaultValue={language === "en-EN" ? "en" : "ru"}>
            <Radio.Button value="en">en</Radio.Button>
            <Radio.Button value="ru">рус</Radio.Button>
          </Radio.Group>
        </List.Item>
        <List.Item>
          <h3>{t("Theme")}</h3>
          <Button className={"ant-btn ant-btn-primary"} onClick={themeToggler}>
            {t("Switch Theme")}
          </Button>
        </List.Item>
        <List.Item>
          <h3>{t("Account")}</h3>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/user/profile" onClick={onOpenChange}>
              {t("Profile")}
            </Link>
          </Button>
        </List.Item>
        <List.Item>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/add-login-type" onClick={onOpenChange}>
              {t("Add Account")}
            </Link>
          </Button>
        </List.Item>
        <List.Item>
          <Logout t={t} />
        </List.Item>
        <List.Item>
          <h3>{t("Navigation")}</h3>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/" onClick={onOpenChange}>
              {t("Back to map")}
            </Link>
          </Button>
        </List.Item>
      </List>
    ) : (
      <List>
        <List.Item>
          <h3>{t("Account")}</h3>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/register" onClick={onOpenChange}>
              {t("Register")}
            </Link>
          </Button>
        </List.Item>
        <List.Item>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/login" onClick={onOpenChange}>
              {t("Login")}
            </Link>
          </Button>
        </List.Item>
        <List.Item>
          <h3>{t("Navigation")}</h3>
          <Button className={"ant-btn ant-btn-primary"}>
            <Link to="/" onClick={onOpenChange}>
              {t("Back to map")}
            </Link>
          </Button>
        </List.Item>
      </List>
    );
  };

  return isMobile ? (
    <DivWithTheme>
      <NavBar icon={<Icon type="ellipsis" />} onClick={onOpenChange}>
        Institutions Map
      </NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: "#A6A6A6", textAlign: "center", paddingTop: 42 }}
        sidebar={sidebar(isAuthenticated)}
        open={isOpen}
        onOpenChange={onOpenChange}
      ></Drawer>
    </DivWithTheme>
  ) : (
    <Header>
      <Link to="/" className={"logo"}></Link>
      <nav className="navigation-container">
        <ul className={"navigation-list"}>
          {isAuthenticated ? (
            <>
              <li className={"navigation-item"}>
                <Radio.Group onChange={onChange} defaultValue={language === "en-EN" ? "en" : "ru"}>
                  <Radio.Button value="en">en</Radio.Button>
                  <Radio.Button value="ru">рус</Radio.Button>
                </Radio.Group>
              </li>
              <li className={"navigation-item"}>
                <Button className={"ant-btn ant-btn-primary"} onClick={themeToggler}>
                  {t("Switch Theme")}
                </Button>
              </li>
              <li className={"navigation-item"}>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/user/profile">{t("Profile")}</Link>
                </Button>
              </li>
              <li className={"navigation-item"}>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/add-login-type">{t("Add Account")}</Link>
                </Button>
              </li>
              <li className={"navigation-item"}>
                <Logout t={t} />
              </li>
            </>
          ) : (
            <>
              <li className={"navigation-item"}>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/register">{t("Register")}</Link>
                </Button>
              </li>
              <li className={"navigation-item"}>
                <Button className={"ant-btn ant-btn-primary"}>
                  <Link to="/login">{t("Login")}</Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Header>
  );
}

export default Navbar;
