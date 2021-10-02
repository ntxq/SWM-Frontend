import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

import EditorButtons from "../editor-buttons";
import TextInput from "./text-input";
import StyleEditor from "./style-editor";
import useImageCapture from "./use-image-capture";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);
  const downloadImage = useImageCapture();

  return (
    <Card
      title="Style Editor"
      extra={
        <EditorButtons
          activeBox={recognition.activeBox}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
          submit={downloadImage}
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
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.originalText
        }
        original={true}
      />
      <TextInput
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        title={"Translated Text"}
        activeBox={recognition.activeBox}
        text={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.translatedText
        }
        original={false}
      />
      <StyleEditor
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        activeBox={recognition.activeBox}
        fontSize={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.fontSize
        }
        fontColor={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.fontColor
        }
        fontFamily={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.fontFamily
        }
        fontWeight={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.fontWeight
        }
        fontStyle={
          recognition.bboxList?.[properties.requestID]?.[properties.cutIndex]?.[
            recognition.activeBox
          ]?.fontStyle
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
