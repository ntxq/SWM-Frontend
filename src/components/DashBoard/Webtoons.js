import React from "react";
import { Col, Row, Radio } from "antd";
import { Link } from "react-router-dom";

import WebtoonCard from "./webtoon-card";

function Webtoons(properties) {
  return (
    <>
      <Radio.Group
        options={properties.language}
        optionType="button"
        buttonStyle="solid"
      />
      <Row>
        {properties.images.map(([url, name], index) => (
          <Col span={6}>
            <Link to={`/editor/${index}`}>
              <WebtoonCard url={url} name={name} key={name} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Webtoons;
