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
      className="editor_panel"
    >
      <TextInput
        title={"Original Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[recognition.activeBox].originalText
        }
        original={true}
      />
      <TextInput
        title={"Translated Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[recognition.activeBox].translatedText
        }
        original={false}
      />
      <StyleEditor
        activeBox={recognition.activeBox}
        fontSize={
          recognition.activeBox !== undefined &&
          recognition.bboxList[recognition.activeBox].fontSize
        }
        fontColor={
          recognition.activeBox !== undefined &&
          recognition.bboxList[recognition.activeBox].fontColor
        }
        fontFamily={
          recognition.activeBox !== undefined
            ? recognition.bboxList[recognition.activeBox].fontFamily
            : "Open Sans"
        }
        fontWeight={
          recognition.activeBox !== undefined
            ? recognition.bboxList[recognition.activeBox].fontWeight
            : "normal"
        }
        fontStyle={
          recognition.activeBox !== undefined
            ? recognition.bboxList[recognition.activeBox].fontStyle
            : "normal"
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
