import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { addLoginType } from "../../../../../actions/auth";

function AddEmail({ addLoginType }) {
  const onFinish = (values) => {
    addLoginType(values);
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Add Email to account
        </Button>{" "}
      </Form.Item>
    </Form>
  );
}

AddEmail.propTypes = {
  addLoginType: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addLoginType
};

export default connect(null, mapDispatchToProps)(AddEmail);
