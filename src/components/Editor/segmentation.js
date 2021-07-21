import React, { useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Steps } from "antd";

import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";

import useMask from "./use-mask";

function Segmentation(properties) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const upload = useMask(properties.webtoon.id);

  const rootReference = useRef(null);
  const lsfReference = useRef(null);

  useEffect(() => {
    if (rootReference.current) {
      lsfReference.current = new LabelStudio(rootReference.current, {
        config: `
        <View style="display: flex;">
          <View style="flex: 50%">
            <BrushLabels name="tag" toName="img">
              <Label value="Text" background="red" />
            </BrushLabels>
            <Image name="img" value="${properties.webtoon.original}" zoomControl="true" />
          </View>
          <View style="flex: 50%; margin-left: 1em">
            <BrushLabels name="tag2" toName="inpaint">
              <Label value="Inpaint" background="blue" />
            </BrushLabels>
            <Image name="inpaint" value="${properties.webtoon.inpaint}" zoomControl="true" />
          </View>
        </View>
              `,
        interfaces: ["controls", "panel", "side-column", "submit", "update"],
        task: {
          annotations: [],
          predictions: [],
          id: 1,
        },
        onLabelStudioLoad: function (ls) {
          const c = ls.annotationStore.addAnnotation({
            userGenerate: true,
          });
          ls.annotationStore.selectAnnotation(c.id);
        },
        onSubmitAnnotation: async function (ls, annotation) {
          await upload(annotation.serializeAnnotation());
        },
        onUpdateAnnotation: async function (ls, annotation) {
          await upload(annotation.serializeAnnotation());
        },
      });
    }
  }, [properties.webtoon, history, path, upload]);

  return (
    <>
      <Steps current={0} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>

      <div className="label-studio-root" ref={rootReference} />
      <Button
        type="primary"
        onClick={() => {
          const currentPath = path.split("/");
          currentPath[currentPath.length - 1] = "recognition";
          history.push(currentPath.join("/"));
          window.scrollTo(0, 0);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default Segmentation;
