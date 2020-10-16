import React from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

import { register } from "../../../../../actions/auth";

function RegisterForm({ t }) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(register(values));
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="email"
        // label="E-mail"
        rules={[
          {
            type: "email",
            message: t("The input is not valid E-mail!")
          },
          {
            required: true,
            message: t("Please input your E-mail!")
          }
        ]}
      >
        <Input placeholder={t("E-mail")} />
      </Form.Item>

      <Form.Item
        name="password"
        // label="Password"
        rules={[
          {
            required: true,
            message: t("Please input your Password!")
          },
          {
            min: 8,
            message: t("Password must be 8 characters or more!")
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
             t( "Password must include at least one upper case letter, one lower case letter, and one numeric digit")
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder={t("Password")} />
      </Form.Item>

      <Form.Item
        name="confirm"
        // label="Confirm Password"
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
        <Input.Password placeholder={t("Confirm Password")} />
      </Form.Item>

      <Form.Item
        name="userName"
        // label={
        //   <span>
        //     Nickname&nbsp;
        //     <Tooltip title="What do you want others to call you?">
        //       <QuestionCircleOutlined />
        //     </Tooltip>
        //   </span>
        // }
        rules={[
          {
            required: true,
            message: t("Please input your nickname!"),
            whitespace: true
          }
        ]}
      >
        <Input placeholder={t("Nickname")} />
      </Form.Item>

      <Form.Item
        name="avatar"
        // label="Avatar URL"
      >
        <Input placeholder={t("Avatar")} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Register")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
