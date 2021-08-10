import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSegmentationResult,
  getSegmentationInpaint,
  getSegmentationMask,
} from "../../../adapters/backend";
import { updateWebtoon } from "../../../contexts/webtoon-drop-slice";

function useSegmentationResult(index) {
  const image = useSelector((state) => state.webtoons.images[index]);
  const dispatch = useDispatch();

  const [cancelResult, setCancelResult] = useState(false);
  const [currentID, setCurrentID] = useState();

  const getResult = useCallback(async () => {
    const intervalID = setInterval(async () => {
      const progress = await getSegmentationResult(image.id);
      dispatch(
        updateWebtoon({
          index,
          webtoon: {
            progress,
          },
        })
      );

      if (progress === "inpaint") {
        clearInterval(intervalID);

        const aiInpaint = await getSegmentationInpaint(image.id);
        dispatch(
          updateWebtoon({
            index,
            webtoon: {
              inpaint: URL.createObjectURL(aiInpaint),
            },
          })
        );

        const aiMask = await getSegmentationMask(image.id);
        dispatch(
          updateWebtoon({
            index,
            webtoon: {
              mask: [
                {
                  id: "AI",
                  from_name: "tag",
                  to_name: "img",
                  type: "brushlabels",
                  value: {
                    format: "rle",
                    rle: aiMask,
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
  }, [dispatch, image.id, index]);

  useEffect(() => {
    if (cancelResult) clearInterval(currentID);
  }, [currentID, cancelResult]);

  return [getResult, setCancelResult];
}

export default useSegmentationResult;
