import { useSelector } from "react-redux";
import { uploadEdit } from "../../../adapters/backend";

function useUploadEdit(request_id) {
  const bboxList = useSelector(
    (state) => state.recognition.bboxList[request_id]
  );

  return async function () {
    await uploadEdit(request_id, bboxList);
  };
}

export default useUploadEdit;
