import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBbox, updateBbox } from "../../../../contexts/recognition-slice";

import RecognitionTable from "./recognition-table";
import useTranslate from "./use-translate";

function RecognitionTableBbox(properties) {
  const dispatch = useDispatch();
  const activeBbox = useSelector((state) => state.recognition.activeBbox);
  const bboxList = useSelector(
    (state) =>
      state.recognition.bboxList[properties.requestID][properties.cutIndex]
  );

  const getTranslate = useTranslate(
    properties.requestID,
    properties.cutIndex,
    bboxList
  );

  useEffect(() => {
    return () => {
      dispatch(selectBbox());
    };
  }, [dispatch]);

  return (
    <RecognitionTable
      requestID={properties.requestID}
      cutIndex={properties.cutIndex}
      submit={() => {
        getTranslate();
        properties.submit();
      }}
      context="bbox"
      boxList={bboxList
        .map((bbox, index) => ({ ...bbox, index }))
        .sort(
          (a, b) =>
            a.group_id - b.group_id ||
            a.group_index - b.group_index ||
            a.bbox_id - b.bbox_id
        )}
      activeBox={activeBbox}
      select={(index) => selectBbox(index)}
      update={(newBox) => updateBbox(newBox)}
    />
  );
}

export default RecognitionTableBbox;
