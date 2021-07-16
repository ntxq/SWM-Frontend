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
        defaultValue={properties.language[0]}
        className="language_choice"
      />
      <Row>
        {properties.images.map(([url, name], index) => (
          <Col span={6} key={name}>
            <Link to={`/editor/${index}/segmentation`}>
              <WebtoonCard url={url} name={name} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Webtoons;
