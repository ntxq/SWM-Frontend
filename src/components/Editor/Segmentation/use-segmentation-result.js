import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postSegmentationStart,
  getSegmentationResult,
  getSegmentationMask,
  getSegmentationInpaintURL,
} from "../../../adapters/backend";
import {
  updateCut,
  updateProgress,
} from "../../../contexts/webtoon-drop-slice";

function useSegmentationResult(webtoonIndex, cutIndex) {
  const imageID = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex].id
  );

  const dispatch = useDispatch();

  const [cancelResult, setCancelResult] = useState(false);
  const [currentID, setCurrentID] = useState();

  const getResult = useCallback(async () => {
    await postSegmentationStart(imageID);

    const intervalID = setInterval(async () => {
      const progress = await getSegmentationResult(imageID, cutIndex + 1);
      dispatch(
        updateProgress({
          index: webtoonIndex,
          cutIndex: cutIndex,
          progress,
        })
      );

      if (progress === 100) {
        clearInterval(intervalID);

        const inpaintURL = getSegmentationInpaintURL(imageID, cutIndex + 1);
        dispatch(
          updateCut({
            index: webtoonIndex,
            cutIndex: cutIndex,
            webtoon: {
              inpaint: inpaintURL,
            },
          })
        );

        const maskRle = await getSegmentationMask(imageID, cutIndex + 1);
        dispatch(
          updateCut({
            index: webtoonIndex,
            cutIndex: cutIndex,
            webtoon: {
              mask: [
                {
                  id: "AI",
                  from_name: "tag",
                  to_name: "img",
                  type: "brushlabels",
                  value: {
                    format: "rle",
                    rle: maskRle,
                    brushlabels: ["AI"],
                  },
                },
              ],
              progress: 0,
            },
          })
        );
      }
    }, 2000);
    setCurrentID(intervalID);
  }, [dispatch, imageID, webtoonIndex, cutIndex]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useSegmentationResult;
