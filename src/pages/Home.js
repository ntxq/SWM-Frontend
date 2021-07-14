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
        <Row className="upload">
          <Col span={11}>
            <WebtoonDrop />
          </Col>
          <Col span={2} />
          <Col span={11}>
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
