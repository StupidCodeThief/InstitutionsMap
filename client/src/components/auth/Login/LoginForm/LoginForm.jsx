import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "../../../../actions/auth";

function LoginForm({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onFinish = (values) => {
    console.log(values);
    login(values);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
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
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={onChange}
            value={email}
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
            onChange={onChange}
            value={password}
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
    </section>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(LoginForm);
