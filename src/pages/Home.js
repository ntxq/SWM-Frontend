import React from "react";
import { Row, Col, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import WebtoonDrop from "../components/Home/WebtoonDrop";
import Preview from "../components/Home/Preview";
import "../styles/Home.css";

const { Header, Content, Footer } = Layout;

function Home(props) {
  return (
    <Layout className="home">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <div className="upload">
          <Row>
            <Col span={11}>
              <WebtoonDrop />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <WebtoonDrop />
            </Col>
          </Row>
        </div>
        <div className="preview">
          <Preview />
        </div>
      </Content>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Home;
