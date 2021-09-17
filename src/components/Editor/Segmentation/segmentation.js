import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import ModalLoading from "../../Common/modal-loading";

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

  const [postMaskChange, setCancelChange] = useMaskUpload(
    properties.webtoonIndex,
    properties.cutIndex
  );

  useEffect(() => {
    if (properties.webtoon.inpaint) {
      setIsModalVisible(false);
      setTimeout(() => window.dispatchEvent(new Event("resize")), 1000);
    } else getSegmentationResult();
  }, [getSegmentationResult, properties.webtoon.inpaint]);

  useLayoutEffect(() => {
    const dispatchResize = () =>
      setTimeout(() => window.dispatchEvent(new Event("resize")), 1000);

    window.addEventListener("focus", dispatchResize);
    return () => window.removeEventListener("focus", dispatchResize);
  }, []);

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
            <Image name="img" value="$original" zoomControl="true" />
          </View>

          <View style="flex: 50%; margin-left: 1em">
            <BrushLabels name="tag2" toName="inpaint">
              <Label value="Inpaint" background="green" />
            </BrushLabels>
            <Image name="inpaint" value="$inpaint" zoomControl="true" />
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
          data: {
            original: properties.webtoon.original,
            inpaint: properties.webtoon.inpaint || properties.webtoon.original,
          },
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
        visible={isModalVisible}
        cancel={() => {
          properties.webtoon.inpaint
            ? setCancelChange(true)
            : setCancelResult(true);

          setIsModalVisible(false);
        }}
        progress={properties.webtoon.progress}
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
