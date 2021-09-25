import React, { useCallback } from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";

import EditorButtons from "./editor-buttons";
import TextInput from "./text-input";
import StyleEditor from "./style-editor";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);

  const downloadText = useCallback(async () => {
    for (const bbox of document.querySelectorAll(".recognition_style .bbox")) {
      const canvas = await html2canvas(bbox, {
        backgroundColor: "null",
        onclone: (clonedCanvas) => {
          for (const clonedBbox of clonedCanvas.querySelectorAll(".bbox")) {
            clonedBbox.classList.add("bbox_download");
          }
        },
        ignoreElements: (element) => {
          return element.classList.contains("unselectable");
        },
        windowWidth: 16_384,
        windowHeight: 16_384,
      });

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "image.png";
      a.click();
    }
  }, []);

  return (
    <Card
      title="Style Editor"
      extra={
        <EditorButtons
          activeBox={recognition.activeBox}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
          submit={downloadText}
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
