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
      title="Text Editor"
      extra={
        <EditorButtons
          activeBox={recognition.activeBox}
          index={properties.index}
        />
      }
      className="editor_panel"
    >
      <TextInput
        index={properties.index}
        title={"Original Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index] &&
          recognition.bboxList[properties.index][recognition.activeBox].originalText
        }
        original={true}
      />
      <TextInput
        index={properties.index}
        title={"Translated Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index] &&
          recognition.bboxList[properties.index][recognition.activeBox].translatedText
        }
        original={false}
      />
      <StyleEditor
        index={properties.index}
        activeBox={recognition.activeBox}
        fontSize={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index] &&
          recognition.bboxList[properties.index][recognition.activeBox].fontSize
        }
        fontColor={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index] &&
          recognition.bboxList[properties.index][recognition.activeBox].fontColor
        }
        fontFamily={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index]
            ? recognition.bboxList[properties.index][recognition.activeBox].fontFamily
            : "Open Sans"
        }
        fontWeight={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index]
            ? recognition.bboxList[properties.index][recognition.activeBox].fontWeight
            : "normal"
        }
        fontStyle={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.index]
            ? recognition.bboxList[properties.index][recognition.activeBox].fontStyle
            : "normal"
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
