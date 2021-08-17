import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../contexts/webtoon-drop-slice";
import { initializeBbox } from "../../contexts/recognition-slice";
import { getCutImage } from "../../adapters/backend";

function useCutOriginal(webtoonIndex) {
  const webtoon = useSelector((state) => state.webtoons.images[webtoonIndex]);
  const dispatch = useDispatch();

  const getOriginal = useCallback(() => {
    for (let cutID = 1; cutID <= webtoon.cutCount; ++cutID) {
      getCutImage(webtoon.id, cutID).then((original) => {
        dispatch(
          updateCut({
            index: webtoonIndex,
            cutIndex: cutID - 1,
            webtoon: {
              original,
            },
          })
        );
      });
    }
    dispatch(
      initializeBbox({
        requestID: webtoon.id,
        cutCount: webtoon.cutCount,
      })
    );
  }, [webtoonIndex, dispatch, webtoon.id, webtoon.cutCount]);

  return getOriginal;
}

export default useCutOriginal;
