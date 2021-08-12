import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSegmentationResult,
  getSegmentationInpaint,
  getSegmentationMask,
} from "../../../adapters/backend";
import { updateCut } from "../../../contexts/webtoon-drop-slice";

function useSegmentationResult(webtoonIndex, cutIndex) {
  const image = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex]
  );
  const dispatch = useDispatch();

  const [cancelResult, setCancelResult] = useState(false);
  const [currentID, setCurrentID] = useState();

  const getResult = useCallback(async () => {
    const intervalID = setInterval(async () => {
      const progress = await getSegmentationResult(image.id, cutIndex + 1);
      dispatch(
        updateCut({
          index: webtoonIndex,
          cutIndex: cutIndex,
          webtoon: {
            progress,
          },
        })
      );

      if (progress === "inpaint") {
        clearInterval(intervalID);

        const inpaintBlob = await getSegmentationInpaint(
          image.id,
          cutIndex + 1
        );
        dispatch(
          updateCut({
            index: webtoonIndex,
            cutIndex: cutIndex,
            webtoon: {
              inpaint: URL.createObjectURL(inpaintBlob),
            },
          })
        );

        const maskRle = await getSegmentationMask(image.id, cutIndex + 1);
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
            },
          })
        );
      }
    }, 2000);
    setCurrentID(intervalID);
  }, [dispatch, image.id, webtoonIndex, cutIndex]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useSegmentationResult;
