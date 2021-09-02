import React from "react";
import Template from "./template";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  Form,
  Input,
  Card,
  Checkbox,
  Button,
  Image,
  Space,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import Logo from "../components/Login/logo.png";
import KakaoLogin from "../components/Login/kakao-login";

import "../styles/Login.css";

function Login(properties) {
  const history = useHistory();

  return (
    <Template removeHeader={true} footerClass="login_footer">
      <div className="login">
        <Image src={Logo} preview={false} className="login_logo" />
        <Typography.Title level={3} className="login_title">
          Sign in to Convertoon
        </Typography.Title>
        <Form
          name="normal_login"
          className="login_form"
          initialValues={{ remember: true }}
          onFinish={() => history.push("/home")}
        >
          <Card className="login_card">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login_form_forgot" to="">
                Forgot password
              </Link>
            </Form.Item>
            <Form.Item>
              <Space direction="vertical" className="login_wrap">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_form_button"
                >
                  Log in
                </Button>
                <KakaoLogin />
                <div>
                  Or <Link to="">register now!</Link>
                </div>
              </Space>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </Template>
  );
}

export default Login;
