import { useDispatch, useSelector } from "react-redux";
import { updateCut } from "../../contexts/webtoon-drop-slice";
import { initializeBbox } from "../../contexts/recognition-slice";
import { getCutImage } from "../../adapters/backend";
import { useCallback } from "react";

function useCutOriginal(webtoonIndex) {
  const webtoon = useSelector((state) => state.webtoons.images[webtoonIndex]);
  const dispatch = useDispatch();

  const getOriginal = useCallback(() => {
    for (const cut of webtoon.cut) {
      if (!cut.original) {
        getCutImage(cut.id, cut.cutID).then((original) =>
          dispatch(
            updateCut({
              index: webtoonIndex,
              cutIndex: cut.cutID - 1,
              webtoon: {
                original,
              },
            })
          )
        );
      }
      dispatch(
        initializeBbox({
          requestID: webtoon.id,
          cutCount: webtoon.cutCount,
        })
      );
    }
  }, [webtoonIndex, dispatch, webtoon]);

  return getOriginal;
}

export default useCutOriginal;
