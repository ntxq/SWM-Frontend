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
                  x: bbox.x * widthRatio,
                  y: bbox.y * heightRatio,
                  width: bbox.width * widthRatio,
                  height: bbox.height * heightRatio,

                  text: bbox.text,
                  group_id: bbox.group_id,
                  group_index: bbox.group_index,
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
