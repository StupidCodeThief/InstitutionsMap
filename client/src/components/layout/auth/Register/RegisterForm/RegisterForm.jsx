import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { register } from "../../../../../actions/auth";
import { getBase64, beforeUpload } from "./RegisterForm.service";

function RegisterForm({ t }) {
  const [form] = Form.useForm();

  const [image, setImage] = useState({
    imageUrl: null,
    loading: false
  });

  const dispatch = useDispatch();

  const onFinish = (values) => {
    values.avatar = image.imageUrl;
    dispatch(register(values));
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setImage({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage({
          imageUrl,
          loading: false
        });
      });
    }
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
            message: t(
              "Password must include at least one upper case letter, one lower case letter, and one numeric digit"
            )
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

      {/* <Form.Item
        name="avatar"
        // label="Avatar URL"
      >
        <Input placeholder={t("Avatar")} />
      </Form.Item> */}

      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {image.imageUrl ? (
          <img src={image.imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <div>
            {image.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Register")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
