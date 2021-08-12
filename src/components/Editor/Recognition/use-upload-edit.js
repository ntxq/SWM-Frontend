import { useSelector } from "react-redux";
import { uploadEdit } from "../../../adapters/backend";

function useUploadEdit(request_id, cutIndex) {
  const bboxList = useSelector(
    (state) => state.recognition.bboxList[request_id][cutIndex]
  );

  return async function () {
    await uploadEdit(request_id, cutIndex + 1, bboxList);
  };
}

export default useUploadEdit;
