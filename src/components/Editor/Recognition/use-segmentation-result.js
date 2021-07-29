import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch } from "react-redux";
import { updateBbox } from "../../../contexts/recognition-slice";

function useSegmentationResult(index) {
  const dispatch = useDispatch();

  return async function () {
    const ocrSuccess = await selectOCR(index);

    if (ocrSuccess) {
      const intervalID = setInterval(async () => {
        const processFinished = await getOCRResult(index);

        if (processFinished) {
          clearInterval(intervalID);
          const bboxList = await getOCRResultBbox(index);
          dispatch(
            updateBbox({
              id: bboxList.id,

              originalX: bboxList.x,
              originalY: bboxList.y,
              originalWidth: bboxList.width,
              originalHeight: bboxList.height,

              translatedX: bboxList.x,
              translatedY: bboxList.y,
              translatedWidth: bboxList.width,
              translatedHeight: bboxList.height,

              originalText: bboxList.original,
              translatedText: bboxList.translated,
            })
          );
        }
      }, 2000);
    }
  };
}

export default useSegmentationResult;
