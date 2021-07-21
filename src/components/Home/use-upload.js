import { useSelector, useDispatch } from "react-redux";
import { mapIds } from "../../contexts/webtoon-drop-slice";
import { uploadOriginals, uploadBlank } from "../../adapters/backend";

function useUpload(properties) {
  const imgSlice = useSelector((state) => state.webtoons.images);
  const dispatch = useDispatch();

  return async function () {
    const request_ids = await uploadOriginals(imgSlice);
    dispatch(mapIds(request_ids));
    await uploadBlank(imgSlice);
  };
}

export default useUpload;
