import { useSelector } from "react-redux";

function useUniquename(properties) {
  const uploaded = useSelector((state) => state.webtoons.images);

  return function (originalFile) {
    const originalName = originalFile.name;

    let count = 1;
    let uniqueName = originalName;
    
    // eslint-disable-next-line no-loop-func
    while (uploaded.some((file) => file[1] === uniqueName))
      uniqueName = originalName + "(" + String(++count) + ")";

    return new File([originalFile], uniqueName, {
      type: originalFile.type,
    });
  };
}

export default useUniquename;
