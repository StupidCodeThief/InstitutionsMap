import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AddEmail from "./AddEmail/AddEmail";
import AddGoogle from "./AddGoogle/AddGoogle";
import AddFacebook from "./AddFacebook/AddFacebook";

import { Container } from "././../../../app/App.styles";

function AddLoginType({ user }) {
  return (
    <Container backgroundColor={"white"}>
      <AddEmail />
      {user.googleId ? null : <AddGoogle />}
      {user.facebookId ? null : <AddFacebook />}
    </Container>
  );
}

AddLoginType.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(AddLoginType);
