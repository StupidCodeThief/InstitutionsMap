import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";

import { Container } from "././../../../app/App.styles";

import { resetPassword } from "../../../../actions/auth";

import { formItemLayout, tailFormItemLayout, extractTokenFromUrl } from "./ResetPassword.service";

function ResetPassword({ resetPassword }) {
  // let token = "";

  // useEffect(() => {
  //   const url_string = window.location.href;

  //   const url = new URL(url_string);
  //   token = url.searchParams.get("token");
  // }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);
    const token = extractTokenFromUrl();
    
    resetPassword(values, token);
  };

  return (
    <Container backgroundColor={"white"}>
      <Form {...formItemLayout} form={form} name="resetPassword" onFinish={onFinish} scrollToFirstError>
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  resetPassword
};

export default connect(null, mapDispatchToProps)(ResetPassword);
