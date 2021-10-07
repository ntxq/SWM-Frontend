import React from "react";
import Template from "./template";
import { useHistory } from "react-router-dom";
import { Typography, Form, Card, Button, Image, Space } from "antd";
import { ToolOutlined } from "@ant-design/icons";

import Logo from "../components/Login/logo.png";
import KakaoLogin from "../components/Login/kakao-login";
import useLogout from "../components/Login/use-logout";

import "../styles/Login.css";

function Login(properties) {
  const history = useHistory();
  useLogout();

  return (
    <Template
      removeHeader={true}
      contentClass="login_content"
      footerClass="login_footer"
      className="login_page"
    >
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
            <Form.Item>
              <Space direction="vertical" className="login_wrap">
                <KakaoLogin />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_form_button"
                  icon={<ToolOutlined className="login_symbol" />}
                >
                  Development
                </Button>
              </Space>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </Template>
  );
}

export default Login;
