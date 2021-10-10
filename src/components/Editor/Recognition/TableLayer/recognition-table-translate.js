import React from "react";
import { useSelector } from "react-redux";

import RecognitionTable from "./recognition-table";
import {
  selectTranslateBox,
  updateTranslateBox,
} from "../../../../contexts/recognition-slice";

function RecognitionTableTranslate(properties) {
  const activeBox = useSelector(
    (state) => state.recognition.activeTranslateBox
  );
  const boxList = useSelector(
    (state) =>
      state.recognition.translateBoxList[properties.requestID][
        properties.cutIndex
      ]
  );

  return (
    <RecognitionTable
      requestID={properties.requestID}
      cutIndex={properties.cutIndex}
      submit={properties.submit}
      boxList={boxList}
      activeBox={activeBox}
      select={(index) => selectTranslateBox(index)}
      update={(newBox) => updateTranslateBox(newBox)}
      translate={true}
    />
  );
}

export default RecognitionTableTranslate;
