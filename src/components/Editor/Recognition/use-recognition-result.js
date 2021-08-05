import { useCallback, useState, useEffect } from "react";
import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch } from "react-redux";
import { createBbox } from "../../../contexts/recognition-slice";

function useRecognitionResult(index) {
  const dispatch = useDispatch();

  const [currentID, setCurrentID] = useState();
  const [cancelResult, setCancelResult] = useState(false);

  const getResult = useCallback(async () => {
    const ocrSuccess = await selectOCR(index);

    if (ocrSuccess) {
      const intervalID = setInterval(async () => {
        const processFinished = await getOCRResult(index);

        if (processFinished) {
          clearInterval(intervalID);
          const bboxList = await getOCRResultBbox(index);
          bboxList.map((bbox) =>
            dispatch(
              createBbox({
                id: index,
                bbox: {
                  bbox_id: bbox.bbox_id,

                  originalX: bbox.originalX,
                  originalY: bbox.originalY,
                  originalWidth: bbox.originalWidth,
                  originalHeight: bbox.originalHeight,

                  translatedX: bbox.originalX,
                  translatedY: bbox.originalY,
                  translatedWidth: bbox.originalWidth,
                  translatedHeight: bbox.originalHeight,

                  originalText: bbox.originalText,
                  translatedText: bbox.originalText,

                  //Temporary for Korean
                  fontSize: bbox.originalHeight * 0.8,
                  fontWeight: "bold",
                  fontFamily: "Nanum Gothic",
                },
              })
            )
          );
        }
      }, 2000);
      setCurrentID(intervalID);
    }
  }, [index, dispatch]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useRecognitionResult;
