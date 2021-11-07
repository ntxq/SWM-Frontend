import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadMask,
  getSegmentationResult,
} from "../../../adapters/segmentation";
import {
  updateProgress,
  updateCut,
} from "../../../contexts/webtoon-drop-slice";

function useMaskUpload(webtoonIndex, cutIndex) {
  const image = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex]
  );
  const dispatch = useDispatch();

  const [cancelUpload, setCancelUpload] = useState(false);
  const [currentID, setCurrentID] = useState();

  const maskUpload = useCallback(
    async (mask) => {
      const maskSuccess = await uploadMask(image.id, cutIndex + 1, mask);

      if (maskSuccess) {
        const intervalID = setInterval(async () => {
          const progress = await getSegmentationResult(image.id, cutIndex + 1);
          dispatch(
            updateProgress({
              index: webtoonIndex,
              cutIndex: cutIndex,
              progress,
            })
          );
        }, 2000);
        setCurrentID(intervalID);
      }
    },

    [dispatch, webtoonIndex, image.id, cutIndex]
  );

  useEffect(() => {
    if (image.progress === 100 && currentID) {
      clearInterval(currentID);
      setCurrentID();

      dispatch(
        updateCut({
          index: webtoonIndex,
          cutIndex: cutIndex,
          webtoon: {
            inpaint: image.inpaint + "?" + Date.now(),
            progress: 0,
          },
        })
      );
    }
  }, [
    dispatch,
    currentID,
    image.progress,
    image.inpaint,
    webtoonIndex,
    cutIndex,
  ]);

  useEffect(() => {
    if (cancelUpload) {
      clearInterval(currentID);
      setCancelUpload(false);
    }
  }, [currentID, cancelUpload]);

  return [maskUpload, setCancelUpload];
}

export default useMaskUpload;
