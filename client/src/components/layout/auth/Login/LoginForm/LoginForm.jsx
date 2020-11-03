import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "../../../../../actions/auth";

function LoginForm({ t }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values))
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
            message: t("Please input your Email!")
          },
          {
            type: "email",
            message: t("The input is not valid E-mail!")
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("Please input your Password!")
          }
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={t("Password")} />
      </Form.Item>
      <Form.Item>
        <Link className="login-form-forgot" to="/forgot-password">
          {t("Forgot password?")}
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t("Login")}
        </Button>
        <span className="theme-provider"> {t("or")} </span>
      <Link to="/register">{t("register now!")}</Link>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
