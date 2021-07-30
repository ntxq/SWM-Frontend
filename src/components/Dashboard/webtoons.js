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
        {properties.images.map((image, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={image.filename}>
            <Link to={`/editor/${index}/segmentation`}>
              <WebtoonCard
                url={image.original}
                name={image.filename}
                id={image.id}
                index={index}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Webtoons;
