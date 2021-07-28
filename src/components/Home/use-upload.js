import { useSelector, useDispatch } from "react-redux";
import { mapIds } from "../../contexts/webtoon-drop-slice";
import { uploadOriginals, uploadBlank } from "../../adapters/backend";

function useUpload() {
  const imgSlice = useSelector((state) => state.webtoons.images);
  const dispatch = useDispatch();

  return function (history) {
    uploadOriginals(imgSlice)
      .then((request_ids) => {
        uploadBlank(imgSlice, request_ids);
        return request_ids;
      })
      .then((request_ids) => dispatch(mapIds(request_ids)))
      .then(() => history.push("/dashboard"));
  };
}

export default useUpload;
