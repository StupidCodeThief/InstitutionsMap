import React from "react";

import { useSelector } from "react-redux";

import AddEmail from "./AddEmail/AddEmail";
import AddGoogle from "./AddGoogle/AddGoogle";
import AddFacebook from "./AddFacebook/AddFacebook";

import { Container } from "././../../../app/App.styles";

function AddLoginType({ t }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <AddEmail t={t} />
      {user.googleId ? null : <AddGoogle t={t} />}
      {user.facebookId ? null : <AddFacebook t={t}/>}
    </Container>
  );
}

export default AddLoginType;
