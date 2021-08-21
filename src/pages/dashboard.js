import React from "react";
import Template from "./template";
import { Tabs, Typography } from "antd";
import { PictureFilled, BookFilled, DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import Webtoons from "../components/Dashboard/webtoons";
import "../styles/Dashboard.css";

function DashBoard(properties) {
  const webtoons = useSelector((state) => state.webtoons);

  return (
    <Template defaultMenu="2" contentClass="content" footerClass="footer">
      <Typography.Title className="project_title">
        {webtoons.form.title} ({webtoons.images.length}) /{" "}
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
    </Template>
  );
}

export default DashBoard;
