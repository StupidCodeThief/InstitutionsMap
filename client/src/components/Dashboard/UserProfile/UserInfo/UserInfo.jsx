import React from "react";
import Moment from "react-moment";

import { ProfileCard, Avatar } from "./UserInfo.styles";
import defaultAvatar from "../../../../img/PNG/defaultAvatar.png";

function UserInfo({ user, t }) {
  return (
    <ProfileCard>
      <div>
        <h2>Username: {user.userName}</h2>
        <p>Email: {user.email}</p>
        <p>
          Registered: <Moment format="YYYY.MM.DD">{user.date}</Moment>
        </p>
        <p>Total places visited: {user.visitedPlaces.length}</p>
      </div>
      <Avatar src={user.avatar || defaultAvatar} alt="users avatar" />
    </ProfileCard>
  );
}

export default UserInfo;
