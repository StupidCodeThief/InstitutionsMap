import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "antd";

import { getUserById, loadUser } from "../../../actions/auth";
import { Container } from "../../app/App.styles";
import UserInfo from "../UserProfile/UserInfo/UserInfo";
import UserPlaces from "../UserProfile/UserPlaces/UserPlaces";

function User({ match }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(match.params.id));

    return function () {
      dispatch(loadUser());
    };
  }, []);

  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);
  const user = useSelector((state) => state.auth.user);

  return (
    <Container
      backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}
      style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
    >
      {!!Object.keys(user).length && <UserInfo user={user} />}
      <UserPlaces />
      <span>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/dashboard">Back to map</Link>
        </Button>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/user/profile">Back to profile</Link>
        </Button>
      </span>
    </Container>
  );
}

export default User;
