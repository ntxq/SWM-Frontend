import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch } from "react-redux";
import { updateBbox } from "../../../contexts/recognition-slice";

function useSegmentationResult(index) {
  const dispatch = useDispatch();

  return function () {
    selectOCR(index).then(() => {
      const intervalID = setInterval(() => {
        getOCRResult(index).then((complete) => {
          if (complete) {
            clearInterval(intervalID);
            getOCRResultBbox(index).then((bboxList) =>
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
              )
            );
          }
        });
      }, 2000);
    });
  };
}

export default useSegmentationResult;
