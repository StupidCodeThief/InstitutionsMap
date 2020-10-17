import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";


import { ProfileCard, Avatar } from "./UserInfo.styles";
import defaultAvatar from "../../../../img/PNG/defaultAvatar.png";

function UserInfo({ user, t }) {
  return (
    <ProfileCard>
      <div>
        <h2>{t("Username")}: {user.userName}</h2>
        <p>{t("Email")}: {user.email}</p>
        <p>
          {t("Registered")}: <Moment format="YYYY.MM.DD">{user.date}</Moment>
        </p>
        <p>{t("Total places visited")}: {user.visitedPlaces.length}</p>
      </div>
      <Avatar src={user.avatar || defaultAvatar} alt="users avatar" />
    </ProfileCard>
  );
}

export default UserInfo;
