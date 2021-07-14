import React from "react";
import { Row, Col, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import BasicMenu from "../components/Common/BasicMenu";

import WebtoonDrop from "../components/Home/WebtoonDrop";
import InpaintDrop from "../components/Home/InpaintDrop";
import Preview from "../components/Home/Preview";
import CreateProject from "../components/Home/CreateProject";
import "../styles/Home.css";

const { Header, Content, Footer } = Layout;

function Home(props) {
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
