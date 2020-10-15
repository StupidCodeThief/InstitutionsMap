import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "../../store";

import "antd/dist/antd.css";

import Map from "../common/GoogleMap/GoogleMap";
import Navbar from "../common/Navbar/Navbar";
import Landing from "../layout/Landing/Landing";
import Login from "../layout/auth/Login/Login";
import Register from "../layout/auth/Register/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../../utils/routing/PrivateRoute";
import ForgotPassword from "../dashboard/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../dashboard/auth/ResetPassword/ResetPassword";
import AddLoginType from "../dashboard/auth/AddLoginType/AddLoginType";
import UserProfile from "../dashboard/UserProfile/UserProfile";
import User from "../dashboard/User/User";
import PlaceDetails from "../dashboard/PlaceDetails/PlaceDetails";

import { GlobalStyles } from "../themeProvider/globalStyles";
import { lightTheme, darkTheme } from "../themeProvider/Themes";
import { useDarkMode } from "../../hooks/useDarkMode";

import { loadUser } from "../../actions/auth";

import "../../App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const changeTheme = () => themeToggler();

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Provider store={store}>
        <Router>
          <Navbar themeToggler={changeTheme} />
          <Map />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/password/reset/" component={ResetPassword} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/add-login-type" component={AddLoginType} />
            <PrivateRoute exact path="/user/profile" component={UserProfile} />
            <PrivateRoute exact path="/user/:id" component={User} />
            <PrivateRoute exact path="/place-info/:id" component={PlaceDetails} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
