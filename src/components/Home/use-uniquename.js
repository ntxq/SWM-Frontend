import { useCallback } from "react";
import { useSelector } from "react-redux";

function useUniquename() {
  const uploaded = useSelector((state) => state.webtoons.images);

  const isDuplicateName = useCallback(
    (uniqueName) => {
      return uploaded.some(({ filename }) => filename === uniqueName);
    },
    [uploaded]
  );

  return function (originalFile) {
    const originalName = originalFile.name;
    const baseName = originalName.split(".").slice(0, -1).join(".");
    const extension = originalName.split(".").pop();

    let count = 1;
    let uniqueName = originalName;

    while (isDuplicateName(uniqueName)) {
      uniqueName = baseName + "(" + String(++count) + ")." + extension;
    }

    return new File([originalFile], uniqueName, {
      type: originalFile.type,
    });
  };
}

export default useUniquename;
