import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../contexts/webtoon-drop-slice";
import { initializeBbox } from "../../contexts/recognition-slice";
import { getCutImageURL } from "../../adapters/backend";

function useCutOriginal(webtoonIndex) {
  const webtoon = useSelector((state) => state.webtoons.images?.[webtoonIndex]);
  const dispatch = useDispatch();

  const getOriginal = useCallback(() => {
    if (webtoonIndex === undefined) return;

    for (let cutID = 1; cutID <= webtoon.cutCount; ++cutID) {
      const cutURL = getCutImageURL(webtoon.id, cutID);
      dispatch(
        updateCut({
          index: webtoonIndex,
          cutIndex: cutID - 1,
          webtoon: {
            original: cutURL,
          },
        })
      );
    }
    dispatch(
      initializeBbox({
        requestID: webtoon.id,
        cutCount: webtoon.cutCount,
      })
    );
  }, [webtoonIndex, dispatch, webtoon?.id, webtoon?.cutCount]);

  return getOriginal;
}

export default useCutOriginal;
