import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Steps, Modal, Spin } from "antd";

import { useDispatch } from "react-redux";
import { updateWebtoon } from "../../../contexts/webtoon-drop-slice";

import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";

import useSegmentationResult from "./use-segmentation-result";
import useMaskUpload from "./use-mask-upload";

function Segmentation(properties) {
  const history = useHistory();
  const dispatch = useDispatch();

  const rootReference = useRef(null);
  const lsfReference = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const getSegmentationResult = useSegmentationResult(properties.index);
  const postMaskChange = useMaskUpload(properties.index);

  useEffect(() => {
    if (properties.webtoon.inpaint) setIsModalVisible(false);
    else getSegmentationResult();
  }, [getSegmentationResult, properties.webtoon.inpaint]);

  useEffect(() => {
    if (rootReference.current) {
      lsfReference.current = new LabelStudio(rootReference.current, {
        config: `
        <View style="display: flex;">
          <View style="flex: 50%">
            <BrushLabels name="tag" toName="img">
              <Label value="Text" background="red" />
              <Label value="AI" background="blue" />
            </BrushLabels>
            <Image name="img" value="${
              properties.webtoon.original
            }" zoomControl="true" />
          </View>

          <View style="flex: 50%; margin-left: 1em">
            <BrushLabels name="tag2" toName="inpaint">
              <Label value="Inpaint" background="green" />
            </BrushLabels>
            <Image name="inpaint" value="${
              properties.webtoon.inpaint || properties.webtoon.original
            }" zoomControl="true" />
          </View>
        </View>
              `,
        interfaces: ["controls", "panel", "side-column", "submit", "update"],
        task: {
          id: 1,
          annotations: [
            {
              result: [...properties.webtoon.mask],
            },
          ],
          predictions: [],
        },
        onLabelStudioLoad: function (ls) {
          const c = ls.annotationStore.addAnnotation({
            userGenerate: true,
          });
          ls.annotationStore.selectAnnotation(c.id);
        },
        onSubmitAnnotation: function (ls, annotation) {
          setIsModalVisible(true);
          dispatch(
            updateWebtoon({
              index: properties.index,
              webtoon: {
                mask: annotation.serializeAnnotation(),
              },
            })
          );
          postMaskChange(annotation.serializeAnnotation());
        },
        onUpdateAnnotation: function (ls, annotation) {
          setIsModalVisible(true);
          dispatch(
            updateWebtoon({
              index: properties.index,
              webtoon: {
                mask: annotation.serializeAnnotation(),
              },
            })
          );
          postMaskChange(annotation.serializeAnnotation());
        },
      });
    }
  }, [properties.webtoon, properties.index, postMaskChange, dispatch]);

  return (
    <>
      <Modal
        visible={isModalVisible}
        centered
        closable={false}
        destroyOnClose={true}
        // eslint-disable-next-line unicorn/no-null
        footer={null}
        maskClosable={false}
        style={{
          background: "rgba(100, 0, 0, 0)",
        }}
        bodyStyle={{
          background: "rgba(0, 0, 0, 0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Modal>

      <Steps current={0} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>

      <div className="label-studio-root" ref={rootReference} />
      <Button
        type="primary"
        onClick={() => {
          history.push(`/editor/${properties.index}/recognition`);
          window.scrollTo(0, 0);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default Segmentation;
