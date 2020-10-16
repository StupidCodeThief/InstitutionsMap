import React from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

import { getRecoveryPasswordLink } from "../../../../../actions/auth";

function ForgotPasswordForm({ t }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);

    dispatch(getRecoveryPasswordLink(values));
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
            message: t("Please input your Email!")
          },
          {
            type: "email",
            message: t("The input is not valid E-mail!")
          }
        ]}
      >
        <Input placeholder={t("E-mail")} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Submit")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordForm;
