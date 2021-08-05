import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSegmentationInpaint,
  getSegmentationResult,
  uploadMask,
} from "../../../adapters/backend";
import { updateWebtoon } from "../../../contexts/webtoon-drop-slice";

function useMaskUpload(index) {
  const image = useSelector((state) => state.webtoons.images[index]);
  const dispatch = useDispatch();

  const [cancelUpload, setCancelUpload] = useState(false);
  const [currentID, setCurrentID] = useState();

  const maskUpload = useCallback(
    async (mask) => {
      const maskSuccess = await uploadMask(image.id, mask);
      if (maskSuccess) {
        const intervalID = setInterval(async () => {
          const processFinished = await getSegmentationResult(image.id);
          if (processFinished) {
            clearInterval(intervalID);

            const inpaint = await getSegmentationInpaint(image.id);
            dispatch(
              updateWebtoon({
                index,
                webtoon: {
                  inpaint: URL.createObjectURL(inpaint),
                },
              })
            );
          }
        }, 2000);
        setCurrentID(intervalID);
      }
    },
    [dispatch, image.id, index]
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
