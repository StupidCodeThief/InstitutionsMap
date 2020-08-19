import React, { Component } from "react";

import { Button } from "antd";

class Google extends Component {
  componentDidMount() {
    const _onInit = (auth2) => {
      console.log("init OK", auth2);
    };
    const _onError = (err) => {
      console.log("error", err);
    };

    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    window.gapi.load("auth2", function () {
      window.gapi.auth2
        .init({
          client_id: "413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
        })
        .then(_onInit, _onError);
    });
  }
  
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      // метод возвращает объект пользователя
      // где есть все необходимые нам поля
      const profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // не посылайте подобную информацию напрямую, на ваш сервер!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // токен
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    });
  };

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.signIn}>
          Log in with Google
        </Button>
        {" "}
        <Button type="primary" onClick={this.signOut}>
          Log out
        </Button>
        {" "}
      </>
    );
  }
}

export default Google;
