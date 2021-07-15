import React, { useEffect, useRef } from "react";
import { Steps } from "antd";

import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";

function Recognition(properties) {
  const rootReference = useRef(null);
  const lsfReference = useRef(null);

  useEffect(() => {
    if (rootReference.current) {
      lsfReference.current = new LabelStudio(rootReference.current, {
        config: `
        <View style="display: flex;">
          <View style="flex: 50%">
            <Rectangle name="text" toName="img" />
            <Image name="img" value="${properties.webtoon[0]}" zoomControl="true" />
          </View>
          <View style="flex: 50%; margin-left: 1em">
            <Rectangle name="translate" toName="translated" />
            <Image name="translated" value="${properties.webtoon[2]}" zoomControl="true" />
          </View>
        </View>
              `,
        interfaces: ["controls", "panel", "side-column", "submit"],
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
        onSubmitAnnotation: function (ls, annotation) {
          console.log(annotation.serializeAnnotation());
        },
        onEntityCreate: function (region) {
          console.log(region.serialize());
        },
      });
    }
  }, [properties.webtoon]);

  return (
    <>
      <Steps current={1} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>
      <div className="label-studio-root" ref={rootReference} />
    </>
  );
}

export default Recognition;
