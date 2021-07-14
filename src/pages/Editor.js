import React from "react";
import { Row, Col, Layout } from "antd";

import BasicMenu from "../components/Common/BasicMenu";

import "../styles/Editor.css";

const { Header, Content, Footer } = Layout;

function Editor(props) {
  return (
    <Layout>
      <Header>
        <BasicMenu default="3" />
      </Header>
      <Content className="content">
      </Content>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
