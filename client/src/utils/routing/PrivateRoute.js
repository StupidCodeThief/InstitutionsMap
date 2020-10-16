import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? null : isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
