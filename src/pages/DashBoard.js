import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Tabs, Typography } from "antd";
import { PictureFilled, BookFilled, DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import Webtoons from "../components/DashBoard/Webtoons";
import "../styles/Dashboard.css";

const { Header, Content, Footer } = Layout;

function DashBoard(props) {
  const webtoons = useSelector((state) => state.webtoons);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={1}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <Typography.Title>
          {webtoons.form.title} ({webtoons.images.length})
        </Typography.Title>
        <Tabs defaultActiveKey="1" size="large">
          <Tabs.TabPane
            tab={
              <>
                <PictureFilled />
                Webtoons
              </>
            }
            key="1"
          >
            <Webtoons images={webtoons.images} language={webtoons.form.language}/>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <>
                <BookFilled />
                User Dictionary
              </>
            }
            key="2"
          >
            Dictionary
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <>
                <DownloadOutlined />
                Download
              </>
            }
            key="3"
          >
            Download
          </Tabs.TabPane>
        </Tabs>
      </Content>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default DashBoard;
