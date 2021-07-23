import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSegmentationResult,
  getSegmentationInpaint,
  getSegmentationMask,
} from "../../adapters/backend";
import { uploadInpaint, updateMask } from "../../contexts/webtoon-drop-slice";

function useSegmentationResult(index) {
  const image = useSelector((state) => state.webtoons.images[index]);
  const [SegmentationResult, setSegmentationResult] = useState(false);
  const dispatch = useDispatch();

  return async function () {
    if (image.inpaint === "") {
      const intervalID = setInterval(async () => {
        const result = await getSegmentationResult(image.id);
        setSegmentationResult(result);

        if (SegmentationResult) {
          clearInterval(intervalID);

          const aiInpaint = await getSegmentationInpaint(image.id);
          dispatch(
            uploadInpaint({
              index,
              inpaint: URL.createObjectURL(aiInpaint),
            })
          );

          const aiMask = await getSegmentationMask(image.id);
          dispatch(updateMask(aiMask));
        }
      }, 1000);
    }
  };
}

export default useSegmentationResult;
