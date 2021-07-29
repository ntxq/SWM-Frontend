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

  return async function (mask) {
    const result = await uploadMask(image.id, mask);
    if (result) {
      const intervalID = setInterval(async () => {
        const result = await getSegmentationResult(image.id);
        if (result) {
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
    }
  };
}

export default useMaskUpload;
