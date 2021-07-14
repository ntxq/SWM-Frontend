import { Col, Row, Radio } from "antd";
import React from "react";

import WebtoonCard from "./WebtoonCard";

function Webtoons(props) {
  return (
    <>
      <Radio.Group options={props.language} optionType="button" buttonStyle="solid" />
      <Row>
        {props.images.map(([url, name]) => (
          <Col span={6}>
            <WebtoonCard url={url} name={name} key={name} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Webtoons;
