import React from "react";
import { Col, Row, Radio } from "antd";

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
        {properties.images.map((image, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={image.filename}>
            <WebtoonCard
              url={image.original}
              name={image.filename}
              id={image.id}
              index={index}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Webtoons;
