import React from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

import { getRecoveryPasswordLink } from "../../../../../actions/auth";
import { ACCOUNT_UPDATED } from "../../../../../actions/types";

function ForgotPasswordForm() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);

    dispatch({ type: ACCOUNT_UPDATED, payload: getRecoveryPasswordLink(values) });
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
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordForm;
