import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "../../../../../actions/auth";

function LoginForm({ login }) {


  const onFinish = (values) => {
    login(values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!"
          },
          {
            type: "email",
            message: "The input is not valid E-mail!"
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!"
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Link className="login-form-forgot" to="/forgot-password">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>{" "}
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(LoginForm);
