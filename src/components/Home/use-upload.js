import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mapIds } from "../../contexts/webtoon-drop-slice";
import { uploadOriginals, uploadBlank } from "../../adapters/backend";

function useUpload() {
  const webtoons = useSelector((state) => state.webtoons);
  const dispatch = useDispatch();
  const history = useHistory();

  return function () {
    uploadOriginals(webtoons.images, webtoons.form.title)
      .then((request_ids) => uploadBlank(webtoons.images, request_ids))
      .then((request_ids) => dispatch(mapIds(request_ids)))
      .then(() => history.push("/dashboard"));
  };
}

export default useUpload;
