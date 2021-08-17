import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../contexts/webtoon-drop-slice";
import { getCutImage } from "../../adapters/backend";
import { useCallback } from "react";

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
  }, [webtoonIndex, dispatch, webtoon.id, webtoon.cutCount]);

  return getOriginal;
}

export default useCutOriginal;
