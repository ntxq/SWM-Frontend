import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSegmentationInpaint,
  getSegmentationResult,
  uploadMask,
} from "../../../adapters/backend";
import { updateCut } from "../../../contexts/webtoon-drop-slice";

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
            updateCut({
              index: webtoonIndex,
              cutIndex: cutIndex,
              webtoon: {
                progress,
              },
            })
          );

          if (progress === 100) {
            clearInterval(intervalID);

            const inpaint = await getSegmentationInpaint(
              image.id,
              cutIndex + 1
            );
            dispatch(
              updateCut({
                index: webtoonIndex,
                cutIndex: cutIndex,
                webtoon: {
                  inpaint: URL.createObjectURL(inpaint),
                  progress: 0,
                },
              })
            );
          }
        }, 2000);
        setCurrentID(intervalID);
      }
    },
    [dispatch, image.id, webtoonIndex, cutIndex]
  );

  useEffect(() => {
    if (cancelUpload) {
      clearInterval(currentID);
      setCancelUpload(false);
    }
  }, [currentID, cancelUpload]);

  return [maskUpload, setCancelUpload];
}

export default useMaskUpload;
