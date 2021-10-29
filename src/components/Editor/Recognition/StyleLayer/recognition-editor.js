import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

import EditorButtons from "../editor-buttons";
import TextInput from "./text-input";
import StyleEditor from "./style-editor";
import useImageCapture from "./use-image-capture";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);
  const downloadImage = useImageCapture(
    properties.requestID,
    properties.cutIndex + 1
  );

  return (
    <Card
      title="Style Editor"
      extra={
        <EditorButtons
          activeBox={
            recognition.currentContext === "bbox"
              ? recognition.activeBbox
              : recognition.activeTranslateBox
          }
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
          context={recognition.currentContext}
          submit={downloadImage}
        />
      }
      className="editor_panel"
    >
      <TextInput
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        title={"Bbox Text"}
        activeBox={
          recognition.currentContext === "bbox"
            ? recognition.activeBbox
            : recognition.activeTranslateBox
        }
        text={
          recognition.currentContext === "bbox"
            ? recognition.bboxList?.[properties.requestID]?.[
                properties.cutIndex
              ]?.[recognition.activeBbox]?.text
            : recognition.translateBoxList?.[properties.requestID]?.[
                properties.cutIndex
              ]?.[recognition.activeTranslateBox]?.text
        }
      />
      <StyleEditor
        requestID={properties.requestID}
        cutIndex={properties.cutIndex}
        activeBox={recognition.activeTranslateBox}
        fontSize={
          recognition.translateBoxList?.[properties.requestID]?.[
            properties.cutIndex
          ]?.[recognition.activeTranslateBox]?.fontSize
        }
        fontColor={
          recognition.translateBoxList?.[properties.requestID]?.[
            properties.cutIndex
          ]?.[recognition.activeTranslateBox]?.fontColor
        }
        fontFamily={
          recognition.translateBoxList?.[properties.requestID]?.[
            properties.cutIndex
          ]?.[recognition.activeTranslateBox]?.fontFamily
        }
        fontWeight={
          recognition.translateBoxList?.[properties.requestID]?.[
            properties.cutIndex
          ]?.[recognition.activeTranslateBox]?.fontWeight
        }
        fontStyle={
          recognition.translateBoxList?.[properties.requestID]?.[
            properties.cutIndex
          ]?.[recognition.activeTranslateBox]?.fontStyle
        }
      />
    </Card>
  );
}

export default RecognitionEditor;
