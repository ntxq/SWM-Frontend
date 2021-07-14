import React from "react";
import { Layout, Tabs, Typography } from "antd";
import { PictureFilled, BookFilled, DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import BasicMenu from "../components/Common/basic-menu";

import Webtoons from "../components/Dashboard/webtoons";
import "../styles/Dashboard.css";

const { Header, Content, Footer } = Layout;

function DashBoard(properties) {
  const webtoons = useSelector((state) => state.webtoons);

  return (
    <Layout>
      <Header>
        <BasicMenu default={"2"} />
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
            <Webtoons
              images={webtoons.images}
              language={webtoons.form.language}
            />
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
