import { uploadMask } from "../../adapters/backend";

function useMask(reqest_id) {
  return async function (mask) {
    const result = await uploadMask(reqest_id, mask);
    console.log(result);

    //todo: get updated inapint image and render
  };
}

export default useMask;
