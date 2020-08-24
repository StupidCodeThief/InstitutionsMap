import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";
import { GoogleLogin } from "react-google-login";

import { login } from "../../../../actions/auth";

function Google({ login }) {
  const responseGoogle = (response) => {
    const token = response.tokenId;
    
    login({ token: token }, "google");
  };

  return (
    <>
      <GoogleLogin
        clientId="413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} className={"ant-btn-primary"}>
            LogIn with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

Google.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Google);

/* <GoogleLogout
        clientId="413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
        render={(renderProps) => <Button onClick={renderProps.onClick}>LogOut with Google</Button>}
        buttonText="Logout"
        onLogoutSuccess={responseGoogle}
      ></GoogleLogout> */

// function Google() {
//   useEffect(() => {
//     const _onInit = (auth2) => {
//       console.log("init OK", auth2);
//     };
//     const _onError = (err) => {
//       console.log("error", err);
//     };

//     // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
//     console.log("Updated");

//     window.gapi.load("auth2", function () {
//       window.gapi.auth2
//         .init({
//           client_id: "413367035338-ca6o4nk3kfme0f3d9m8eo26mepb1ueum.apps.googleusercontent.com"
//         })
//         .then(_onInit, _onError);
//     });
//   }, [window.gapi]);

//   const signIn = () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signIn().then((googleUser) => {
//       // метод возвращает объект пользователя
//       // где есть все необходимые нам поля
//       const profile = googleUser.getBasicProfile();
//       console.log("ID: " + profile.getId()); // не посылайте подобную информацию напрямую, на ваш сервер!
//       console.log("Full Name: " + profile.getName());
//       console.log("Given Name: " + profile.getGivenName());
//       console.log("Family Name: " + profile.getFamilyName());
//       console.log("Image URL: " + profile.getImageUrl());
//       console.log("Email: " + profile.getEmail());

//       // токен
//       const id_token = googleUser.getAuthResponse().id_token;
//       console.log("ID Token: " + id_token);
//     });
//   };

//   const signOut = () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log("User signed out.");
//     });
//   };

//   return (
//     <>
//       <Button type="primary" onClick={signIn}>
//         Log in with Google
//       </Button>{" "}
//       <Button type="primary" onClick={signOut}>
//         Log out
//       </Button>{" "}
//     </>
//   );
// }

// export default Google;
