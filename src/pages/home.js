import React from "react";
import Template from "./template";
import { Row, Col } from "antd";

import WebtoonDrop from "../components/Home/webtoon-drop";
import InpaintDrop from "../components/Home/inpaint-drop";
import Preview from "../components/Home/preview";
import CreateProject from "../components/Home/create-project";
import "../styles/Home.css";

function Home(properties) {
  return (
    <Template defaultMenu="1" contentClass="content" footerClass="footer">
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
    </Template>
  );
}

export default Home;
