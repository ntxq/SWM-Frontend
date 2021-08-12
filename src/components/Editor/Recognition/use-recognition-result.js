import { useCallback, useState, useEffect } from "react";
import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../../contexts/webtoon-drop-slice";
import { createBbox } from "../../../contexts/recognition-slice";

function useRecognitionResult(webtoonIndex, cutIndex) {
  const image = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex]
  );
  const dispatch = useDispatch();

  const [currentID, setCurrentID] = useState();
  const [cancelResult, setCancelResult] = useState(false);

  const getResult = useCallback(async () => {
    const ocrSuccess = await selectOCR(image.id, cutIndex + 1);

    if (ocrSuccess) {
      const intervalID = setInterval(async () => {
        const progress = await getOCRResult(image.id, cutIndex + 1);
        dispatch(
          updateCut({
            index: webtoonIndex,
            cutIndex: cutIndex,
            webtoon: {
              progress,
            },
          })
        );

        if (progress === "bbox") {
          clearInterval(intervalID);
          const bboxList = await getOCRResultBbox(image.id, cutIndex + 1);

          const clientImage = document.querySelector(".unselectable");
          const widthRatio = clientImage.clientWidth / clientImage.naturalWidth;
          const heightRatio =
            clientImage.clientHeight / clientImage.naturalHeight;

          bboxList.map((bbox) =>
            dispatch(
              createBbox({
                requestID: image.id,
                cutIndex: cutIndex,
                bbox: {
                  bbox_id: bbox.bbox_id,

                  originalX: bbox.originalX * widthRatio,
                  originalY: bbox.originalY * heightRatio,
                  originalWidth: bbox.originalWidth * widthRatio,
                  originalHeight: bbox.originalHeight * heightRatio,

                  translatedX: bbox.originalX * widthRatio,
                  translatedY: bbox.originalY * heightRatio,
                  translatedWidth: bbox.originalWidth * widthRatio,
                  translatedHeight: bbox.originalHeight * heightRatio,

                  originalText: bbox.originalText,
                  translatedText: bbox.originalText,

                  //Temporary for Korean
                  fontSize: Math.round(bbox.originalHeight * heightRatio * 0.8),
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
  }, [webtoonIndex, cutIndex, image.id, dispatch]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useRecognitionResult;
