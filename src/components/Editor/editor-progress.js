import React from "react";
import { Steps } from "antd";

function EditorProgress(properties) {
  return (
    <Steps className="editor_progress" {...properties}>
      <Steps.Step title="Segmentation" />
      <Steps.Step title="Recognition" />
      <Steps.Step title="Finish" />
    </Steps>
  );
}

export default EditorProgress;
