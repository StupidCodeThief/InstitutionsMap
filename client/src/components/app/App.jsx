import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useTranslation } from "react-i18next";

import store from "../../store";

import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";

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
import "../../utils/localization/i18n";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [theme, themeToggler] = useDarkMode();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const changeTheme = () => themeToggler();

  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
    navigator.userAgent
  );

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Provider store={store}>
        <Router>
          <Navbar themeToggler={changeTheme} languageToggler={changeLanguage} language={i18n.language} t={t}  isMobile={isMobile}/>
          <Map t={t} isMobile={isMobile} language={i18n.language}/>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" render={(props) => <Login {...props} t={t} />} />
            <Route exact path="/register" render={(props) => <Register {...props} t={t}/>} />
            <Route exact path="/forgot-password" render={(props) => <ForgotPassword {...props} t={t} />} />
            <Route exact path="/password/reset/" render={(props) => <ResetPassword {...props} t={t} />} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} t={t} isMobile={isMobile}/>
            <PrivateRoute exact path="/add-login-type" component={AddLoginType} t={t} />
            <PrivateRoute exact path="/user/profile" component={UserProfile} t={t} />
            <PrivateRoute exact path="/user/:id" component={User} t={t} />
            <PrivateRoute exact path="/place-info/:id" component={PlaceDetails} t={t} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
