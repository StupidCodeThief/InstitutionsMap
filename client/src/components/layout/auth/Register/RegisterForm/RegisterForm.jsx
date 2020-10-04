import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { register } from "../../../../../actions/auth";

import { formItemLayout, tailFormItemLayout } from "./RegisterForm.service";

function RegisterForm({ register }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    register(values);
  };

  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          },
          {
            min: 8,
            message: "Password must be 8 characters or more!"
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              "Password must include at least one upper case letter, one lower case letter, and one numeric digit"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("The two passwords that you entered do not match!");
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="userName"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="avatar" label="Avatar URL">
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  register
};

export default connect(null, mapDispatchToProps)(RegisterForm);
