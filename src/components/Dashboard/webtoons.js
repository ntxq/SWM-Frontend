import React, { useEffect } from "react";
import { Col, Row, Radio } from "antd";
import { useParams } from "react-router";

import WebtoonCard from "./webtoon-card";
import useCutOriginal from "./use-cut-original";

function Webtoons(properties) {
  const { webtoonIndex } = useParams();
  const getCutOriginal = useCutOriginal(webtoonIndex);

  useEffect(() => {
    if (webtoonIndex !== undefined) getCutOriginal();
  }, [getCutOriginal, webtoonIndex]);

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
        {webtoonIndex !== undefined
          ? properties.images[webtoonIndex].cut.map((image, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={image.filename}>
                <WebtoonCard
                  webtoonIndex={webtoonIndex}
                  index={index}
                  url={image.original}
                  name={image.filename}
                />
              </Col>
            ))
          : properties.images.map((image, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={image.filename}>
                <WebtoonCard
                  webtoonIndex={webtoonIndex}
                  index={index}
                  url={image.original}
                  name={image.filename}
                />
              </Col>
            ))}
      </Row>
    </>
  );
}

export default Webtoons;
