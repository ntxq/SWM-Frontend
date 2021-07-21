import { getSegmentationAll } from "../../adapters/backend";

function useSegmentation(request_id) {
  return async function () {
    const result = await getSegmentationAll(request_id);
    console.log(result);
    //todo: Change inpaint image to result, add mask to store, and overlap on original
  };
}

export default useSegmentation;
