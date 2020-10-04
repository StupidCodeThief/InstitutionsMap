import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";

import { getRecoveryPasswordLink } from "../../../../../actions/auth";

function ForgotPasswordForm({ getRecoveryPasswordLink }) {
  const onFinish = (values) => {
    console.log("Success:", values);

    getRecoveryPasswordLink(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
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
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

ForgotPasswordForm.propTypes = {
  getRecoveryPasswordLink: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getRecoveryPasswordLink
};

export default connect(null, mapDispatchToProps)(ForgotPasswordForm);
