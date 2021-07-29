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

  return async function () {
    if (image.inpaint === "") {
      const intervalID = setInterval(async () => {
        const result = await getSegmentationResult(image.id);

        if (result) {
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
    }
  };
}

export default useSegmentationResult;
