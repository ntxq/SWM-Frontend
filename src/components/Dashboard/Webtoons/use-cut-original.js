import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../../contexts/webtoon-drop-slice";
import { initializeBoxList } from "../../../contexts/recognition-slice";
import {
  getCutImageURL,
  getSegmentationInpaintURL,
} from "../../../adapters/segmentation";

function useCutOriginal(webtoonIndex) {
  const webtoon = useSelector((state) => state.webtoons.images?.[webtoonIndex]);
  const dispatch = useDispatch();

  const getOriginal = useCallback(() => {
    if (webtoonIndex === undefined) return;

    for (let cutID = 1; cutID <= webtoon.cutCount; ++cutID) {
      const updatedWebtoon = {
        original: getCutImageURL(webtoon.id, cutID),
      };

      if (webtoon.inpaint)
        updatedWebtoon.inpaint = getSegmentationInpaintURL(webtoon.id, cutID);

      dispatch(
        updateCut({
          index: webtoonIndex,
          cutIndex: cutID - 1,
          webtoon: updatedWebtoon,
        })
      );
    }
    dispatch(
      initializeBoxList({
        requestID: webtoon.id,
        cutCount: webtoon.cutCount,
      })
    );
  }, [
    dispatch,
    webtoonIndex,
    webtoon?.id,
    webtoon?.cutCount,
    webtoon?.inpaint,
  ]);

  return getOriginal;
}

export default useCutOriginal;
