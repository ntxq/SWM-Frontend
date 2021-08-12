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
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
      }
      className="editor_panel"
    >
      <TextInput
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        title={"Original Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.requestID][properties.cutIndex][
            recognition.activeBox
          ].originalText
        }
        original={true}
      />
      <TextInput
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        title={"Translated Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.requestID][properties.cutIndex][
            recognition.activeBox
          ].translatedText
        }
        original={false}
      />
      <StyleEditor
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        activeBox={recognition.activeBox}
        fontSize={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.requestID][properties.cutIndex][
            recognition.activeBox
          ].fontSize
        }
        fontColor={
          recognition.activeBox !== undefined &&
          recognition.bboxList[properties.requestID][properties.cutIndex][
            recognition.activeBox
          ].fontColor
        }
        fontFamily={
          recognition.activeBox !== undefined
            ? recognition.bboxList[properties.requestID][properties.cutIndex][
                recognition.activeBox
              ].fontFamily
            : "Open Sans"
        }
        fontWeight={
          recognition.activeBox !== undefined
            ? recognition.bboxList[properties.requestID][properties.cutIndex][
                recognition.activeBox
              ].fontWeight
            : "normal"
        }
        fontStyle={
          recognition.activeBox !== undefined
            ? recognition.bboxList[properties.requestID][properties.cutIndex][
                recognition.activeBox
              ].fontStyle
            : "normal"
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
