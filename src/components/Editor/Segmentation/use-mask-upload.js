import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadMask } from "../../../adapters/backend";
import { initializeBbox } from "../../../contexts/recognition-slice";

function useMaskUpload(webtoonIndex, cutIndex) {
  const image = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex]
  );
  const dispatch = useDispatch();

  const maskUpload = useCallback(
    async (mask) =>
      await uploadMask(image.id, cutIndex + 1, mask).then(
        (maskSuccess) =>
          maskSuccess &&
          dispatch(
            initializeBbox({
              requestID: image.id,
              cutCount: image.cutCount,
            })
          )
      ),

    [dispatch, image.id, image.cutCount, cutIndex]
  );

  return maskUpload;
}

export default useMaskUpload;
