import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "antd";

import { getUserById, loadUser } from "../../../actions/auth";
import { Container } from "../../app/App.styles";
import UserInfo from "../UserProfile/UserInfo/UserInfo";
import UserPlaces from "../UserProfile/UserPlaces/UserPlaces";

function User({ match, t }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(match.params.id));

    return function () {
      dispatch(loadUser());
    };
  }, []);

  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      {!!Object.keys(user).length && <UserInfo user={user} t={t} />}
      {!!Object.keys(user).length && <UserPlaces user={user} t={t} />}
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
