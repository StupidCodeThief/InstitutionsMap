import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

import { ProfileCard, Avatar } from "./UserInfo.styles";
import defaultAvatar from "../../../../img/PNG/defaultAvatar.png";

function UserInfo({ user }) {
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  return (
    <ProfileCard>
      <div>
        <h2 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Username: {user.userName}</h2>
        <p>Email: {user.email}</p>
        <p>
          Registered: <Moment format="YYYY.MM.DD">{user.date}</Moment>
        </p>
      </div>
      <Avatar src={user.avatar || defaultAvatar} alt="users avatar" />
    </ProfileCard>
  );
}

export default UserInfo;
