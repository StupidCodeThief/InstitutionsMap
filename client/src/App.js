import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "./App.css";
import "antd/dist/antd.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Notification from "./components/layout/Notification/Notification";
import Landing from "./components/layout/Landing/Landing";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import { loadUser } from "./actions/auth";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section className="container">
          <Notification />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
