import React from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

import { Container } from "././../../../app/App.styles";

import { resetPassword } from "../../../../actions/auth";

import { formItemLayout, tailFormItemLayout, extractTokenFromUrl } from "./ResetPassword.service";

function ResetPassword({ t }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const token = extractTokenFromUrl();

    dispatch(resetPassword(values, token));
  };

  return (
    <Container>
      <h1>{t("Set new password")}</h1>
      <Form {...formItemLayout} form={form} name="resetPassword" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="password"
          label={t("Password")}
          rules={[
            {
              required: true,
              message: t("Please input your password!")
            },
            {
              min: 8,
              message: t("Password must be 8 characters or more!")
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: t(
                "Password must include at least one upper case letter, one lower case letter, and one numeric digit"
              )
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder={t("New password")} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={t("Confirm Password")}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("Please confirm your password!")
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(t("The two passwords that you entered do not match!"));
              }
            })
          ]}
        >
          <Input.Password placeholder={t("Confirm password")} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {t("Submit")}
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default ResetPassword;
