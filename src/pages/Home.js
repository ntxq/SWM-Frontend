import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import WebtoonDrop from "../components/Home/WebtoonDrop";
import Preview from "../components/Home/Preview";
import "../styles/Home.css";

function Home(props) {
  return (
    <div className="Home">
      <Link to="/dashboard">Dashboard</Link>
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
    </div>
  );
}

export default Home;
