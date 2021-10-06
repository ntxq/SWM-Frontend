import { useCallback, useState, useEffect } from "react";
import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/recognition";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCut,
  updateProgress,
} from "../../../contexts/webtoon-drop-slice";
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
          updateProgress({
            index: webtoonIndex,
            cutIndex: cutIndex,
            progress,
          })
        );

        if (progress === 100) {
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
                  translatedText: bbox.translatedText || bbox.originalText,

                  fontColor: bbox.fontColor || "#000000",
                  fontSize: bbox.fontSize || 30,
                  fontFamily: bbox.fontFamily || "Nanum Gothic",
                  fontWeight: bbox.fontWeight || "bold",
                  fontStyle: bbox.fontStyle || "normal",
                },
              })
            )
          );

          dispatch(
            updateCut({
              index: webtoonIndex,
              cutIndex: cutIndex,
              webtoon: {
                progress: 0,
              },
            })
          );
        }
      }, 3000);
      setCurrentID(intervalID);
    }
  }, [webtoonIndex, cutIndex, image.id, dispatch]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useRecognitionResult;
