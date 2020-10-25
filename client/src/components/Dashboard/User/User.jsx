import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "antd";

import { getUserById } from "../../../actions/auth";
import { Container } from "../../app/App.styles";
import UserInfo from "../UserProfile/UserInfo/UserInfo";
import UserPlaces from "../UserProfile/UserPlaces/UserPlaces";

function User({ match, t }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(match.params.id));
  }, [dispatch, match.params.id]);

  const user = useSelector((state) => state.auth.userInfo);

  return (
    <Container>
      <h1 className={"visually-hidden"}>{t("User`s information")}</h1>
      <UserInfo user={user} t={t} />
      <UserPlaces user={user} t={t} />
      <span>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/dashboard">{t("Back to map")}</Link>
        </Button>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/user/profile">{t("Back to profile")}</Link>
        </Button>
      </span>
    </Container>
  );
}

export default User;
