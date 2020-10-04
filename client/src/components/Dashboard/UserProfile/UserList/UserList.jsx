import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Avatar } from "antd";

import { getUsers } from "../../../../actions/places";

const { Meta } = Card;

function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.auth.users);

  return (
    <div>
      <ol>
        {users.map((user) => {
          return (
            <Card style={{ width: 300, marginTop: 16 }} key={user.id}>
              <Meta
                avatar={<Avatar src={user.avatar} alt="place image" />}
                title={user.userName}
                description={user.email}
              />
            </Card>
          );
        })}
      </ol>
    </div>
  );
}

export default UserList;
