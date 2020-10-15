import React from "react";

import { useSelector } from "react-redux";

import AddEmail from "./AddEmail/AddEmail";
import AddGoogle from "./AddGoogle/AddGoogle";
import AddFacebook from "./AddFacebook/AddFacebook";

import { Container } from "././../../../app/App.styles";

function AddLoginType() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <AddEmail />
      {user.googleId ? null : <AddGoogle />}
      {user.facebookId ? null : <AddFacebook />}
    </Container>
  );
}

export default AddLoginType;
