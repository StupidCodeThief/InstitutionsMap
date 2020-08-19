import React from 'react';
import FacebookLogin from 'react-facebook-login';



class Facebook extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="2769260053317770"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass={"ant-btn ant-btn-primary"}
      />
    )
  }
}

export default Facebook;
