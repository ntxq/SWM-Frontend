import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

import EditorButtons from "./editor-buttons";
import TextInput from "./text-input";
import StyleEditor from "./style-editor";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);

  return (
    <Card
      title="Recognition Editor"
      extra={<EditorButtons activeBox={recognition.activeBox} />}
    >
      <TextInput
        title={"Original Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxText[recognition.activeBox].original
        }
        original={true}
      />
      <TextInput
        title={"Translated Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxText[recognition.activeBox].translated
        }
        original={false}
      />
      <StyleEditor
        activeBox={recognition.activeBox}
        fontSize={
          recognition.activeBox !== undefined &&
          recognition.bboxText[recognition.activeBox].fontSize
        }
        fontColor={
          recognition.activeBox !== undefined &&
          recognition.bboxText[recognition.activeBox].fontColor
        }
        fontFamily={
          recognition.activeBox !== undefined
            ? recognition.bboxText[recognition.activeBox].fontFamily
            : "Open Sans"
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
