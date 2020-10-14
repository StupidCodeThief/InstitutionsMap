import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Avatar } from "antd";

import { getUsers } from "../../../../actions/places";
import defaultAvatar from "../../../../img/PNG/defaultAvatar.png";

const { Meta } = Card;

function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.auth.users);

  return (
    <div>
      {users.map((user) => {
        return (
          <Link to={`/user/${user._id}`} key={user._id}>
            <Card style={{ width: 300, marginBottom: 16 }}>
              <Meta
                avatar={<Avatar src={user.avatar || defaultAvatar} alt="place image" />}
                title={user.userName}
                description={user.email}
              />
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default UserList;
