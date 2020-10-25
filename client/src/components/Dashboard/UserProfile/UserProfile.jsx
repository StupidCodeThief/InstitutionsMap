import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Tabs, Button } from "antd";

import { Container } from "../../app/App.styles";
import UserInfo from "./UserInfo/UserInfo";
import UserList from "./UserList/UserList";
import UserPlaces from "./UserPlaces/UserPlaces";

const { TabPane } = Tabs;

function UserProfile({ t }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <h1 className={"visually-hidden"}>{t("User`s profile")}</h1>
      <Tabs defaultActiveKey="1" className="tabs">
        <TabPane tab={t("User info")} key="1">
          <UserInfo user={user} t={t} />
        </TabPane>
        <TabPane tab={t("User places")} key="2">
          <UserPlaces user={user} t={t} />
        </TabPane>
        <TabPane tab={t("All users")} key="3">
          <UserList />
        </TabPane>
      </Tabs>
      <Button className={"ant-btn ant-btn-primary"} style={{ width: "150px" }}>
        <Link to="/dashboard">{t("Back to map")}</Link>
      </Button>
    </Container>
  );
}

export default UserProfile;
