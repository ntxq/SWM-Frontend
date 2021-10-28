import React, { useEffect } from "react";
import Template from "./template";
import { message, Tabs } from "antd";
import { PictureFilled, BookFilled, DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import Webtoons from "../components/Dashboard/webtoons";
import "../styles/Dashboard.css";
import DashboardTitle from "../components/Dashboard/dashboard-title";

function DashBoard(properties) {
  const webtoons = useSelector((state) => state.webtoons);
  const location = useLocation();

  useEffect(() => {
    if (new URLSearchParams(location.search).get("success"))
      message.success("Webtoon image saved successfully.", 5)();
  }, [location.search]);

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
