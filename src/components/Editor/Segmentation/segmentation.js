import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import ModalLoading from "../../Common/modal-loading";
import loadingText from "../../Common/loading-text";

import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";

import { useDispatch } from "react-redux";
import { updateCut } from "../../../contexts/webtoon-drop-slice";

import useSegmentationResult from "./use-segmentation-result";
import useMaskUpload from "./use-mask-upload";
import EditorProgress from "../editor-progress";

function Segmentation(properties) {
  const history = useHistory();
  const dispatch = useDispatch();

  const rootReference = useRef(null);
  const lsfReference = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(true);

  const [getSegmentationResult, setCancelResult] = useSegmentationResult(
    properties.webtoonIndex,
    properties.cutIndex
  );

  const [postMaskChange, setCancelUpload] = useMaskUpload(
    properties.webtoonIndex,
    properties.cutIndex
  );

  useEffect(() => {
    if (properties.webtoon.inpaint) {
      setIsModalVisible(false);
      setTimeout(() => window.dispatchEvent(new Event("resize")), 1000);
    } else getSegmentationResult();
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
            updateCut({
              index: properties.webtoonIndex,
              cutIndex: properties.cutIndex,
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
            updateCut({
              index: properties.webtoonIndex,
              cutIndex: properties.cutIndex,
              webtoon: {
                mask: annotation.serializeAnnotation(),
              },
            })
          );
          postMaskChange(annotation.serializeAnnotation());
        },
      });
    }
  }, [
    properties.webtoon.original,
    properties.webtoon.inpaint,
    properties.webtoon.mask,
    properties.webtoonIndex,
    properties.cutIndex,
    postMaskChange,
    dispatch,
  ]);

  return (
    <>
      <ModalLoading
        loading={isModalVisible}
        cancel={() => {
          properties.webtoon.inpaint
            ? setCancelUpload(true)
            : setCancelResult(true);

          setIsModalVisible(false);
        }}
        tip={loadingText[properties.webtoon.progress]}
      />

      <EditorProgress current={0} />
      <div className="label-studio-root" ref={rootReference} />
      <Button
        type="primary"
        onClick={() => {
          history.push(
            `/editor/${properties.webtoonIndex}/${properties.cutIndex}/recognition`
          );
          window.scrollTo(0, 0);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default Segmentation;
