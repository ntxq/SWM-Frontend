import { useSelector } from "react-redux";

function useUniquename() {
  const uploaded = useSelector((state) => state.webtoons.images);

  return function (originalFile) {
    const originalName = originalFile.name;
    const baseName = originalName.split(".").slice(0, -1).join(".");
    const extension = originalName.split(".").pop();

    let count = 1;
    let uniqueName = originalName;

    // eslint-disable-next-line no-loop-func
    while (uploaded.some((file) => file.filename === uniqueName)) {
      uniqueName = baseName + "(" + String(++count) + ")." + extension;
    }

    return new File([originalFile], uniqueName, {
      type: originalFile.type,
    });
  };
}

export default useUniquename;
