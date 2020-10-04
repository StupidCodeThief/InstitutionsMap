import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

function UserInfo() {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  return (
    <div>
      <h2>Username: {user.userName}</h2>
      <p>Email: {user.email}</p>
      <p>
        Registered: <Moment format="YYYY.MM.DD">{user.date}</Moment>
      </p>
    </div>
  );
}

export default UserInfo;
