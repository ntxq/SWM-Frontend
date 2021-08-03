import React from "react";
import { Row, Col, Layout } from "antd";

import BasicMenu from "../components/Common/basic-menu";

import WebtoonDrop from "../components/Home/webtoon-drop";
import InpaintDrop from "../components/Home/inpaint-drop";
import Preview from "../components/Home/preview";
import CreateProject from "../components/Home/create-project";
import "../styles/Home.css";

const { Header, Content, Footer } = Layout;

function Home(properties) {
  return (
    <Layout>
      <Header>
        <BasicMenu default={"1"} />
      </Header>
      <Content className="content">
        <Row gutter={[60, 20]} className="upload">
          <Col sm={24} lg={12} className="upload-row">
            <WebtoonDrop />
          </Col>
          <Col sm={24} lg={12} className="upload-row">
            <InpaintDrop />
          </Col>
        </Row>
        <Preview />
        <CreateProject />
      </Content>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Home;
