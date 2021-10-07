import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mapIds } from "../../contexts/webtoon-drop-slice";
import { createProject } from "../../adapters/backend";

function useUpload() {
  const webtoons = useSelector((state) => state.webtoons);
  const dispatch = useDispatch();
  const history = useHistory();

  return function () {
    createProject(webtoons.images, webtoons.form.title)
      .then((imageMap) => dispatch(mapIds(imageMap)))
      .then(() => history.push("/dashboard"));
  };
}

export default useUpload;
