import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "./App.css";
import "antd/dist/antd.css";

import Navbar from "./components/layout/Navbar/Navbar";

import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>
  );
}

export default App;
