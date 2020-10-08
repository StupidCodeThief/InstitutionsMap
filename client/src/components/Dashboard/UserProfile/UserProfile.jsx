import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Tabs, Button } from "antd";

import { Container } from "../../app/App.styles";
import UserInfo from "./UserInfo/UserInfo";
import UserList from "./UserList/UserList";
import UserPlaces from "./UserPlaces/UserPlaces";

const { TabPane } = Tabs;

function UserProfile() {
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);
  const user = useSelector((state) => state.auth.user);

  function callback(key) {
    console.log(key);
  }

  return (
    <Container backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}>
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        style={{ color: isThemeDArk ? "#fff" : "#27292D", overflow: "scroll" }}
      >
        <TabPane tab="User info" key="1">
          <UserInfo user={user} />
        </TabPane>
        <TabPane tab="User places" key="2">
          <UserPlaces />
        </TabPane>
        <TabPane tab="All users" key="3">
          <UserList />
        </TabPane>
      </Tabs>
      <Button className={"ant-btn ant-btn-primary"} style={{ width: "150px" }}>
        <Link to="/dashboard">Back to map</Link>
      </Button>
    </Container>
  );
}

export default UserProfile;
