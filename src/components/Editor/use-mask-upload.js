import { useSelector } from "react-redux";
import { uploadMask } from "../../adapters/backend";

function useMaskUpload(index) {
  const image = useSelector((state) => state.webtoons.images[index]);

  return async function (mask) {
    const result = await uploadMask(image.id, mask);
    if (result) {
    }
  };
}

export default useMaskUpload;
