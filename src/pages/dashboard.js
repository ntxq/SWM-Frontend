import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { message, Tabs } from "antd";
import { PictureFilled, DownloadOutlined } from "@ant-design/icons";

import Template from "./template";
import Webtoons from "../components/Dashboard/Webtoons/webtoons";
import DashboardTitle from "../components/Dashboard/Webtoons/dashboard-title";
import Download from "../components/Dashboard/Download/download";
import { postImageComplete } from "../adapters/recognition";
import "../styles/Dashboard.css";

function DashBoard(properties) {
  const webtoons = useSelector((state) => state.webtoons);
  const location = useLocation();

  useEffect(() => {
    if (new URLSearchParams(location.search).get("success")) {
      message.success("Webtoon image saved successfully.", 5)();

      const requestID = Number(
        new URLSearchParams(location.search).get("requestID")
      );
      const webtoonIndex = webtoons.images.findIndex(
        (webtoon) => webtoon.id === requestID
      );

      if (
        webtoonIndex !== -1 &&
        webtoons.images[webtoonIndex].cut.every((cut) => cut.complete)
      ) {
        postImageComplete(requestID);
      }
    }
  }, [location.search, webtoons.images]);

  return (
    <Template
      defaultMenu="2"
      headerClass="header"
      contentClass="content"
      footerClass="footer"
      className="dashboard"
    >
      <DashboardTitle />
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
              <DownloadOutlined />
              Download
            </>
          }
          key="2"
        >
          <Download />
        </Tabs.TabPane>
      </Tabs>
    </Template>
  );
}

export default DashBoard;
