import { useSelector, useDispatch } from "react-redux";
import { mapIds } from "../../contexts/webtoon-drop-slice";
import { uploadOriginals } from "../../adapters/backend";

function useUploadOriginal(properties) {
  const imgSlice = useSelector((state) => state.webtoons.images);
  const dispatch = useDispatch();

  return async function () {
    const request_ids = await uploadOriginals(imgSlice);
    dispatch(mapIds(request_ids));
  };
}

export default useUploadOriginal;
