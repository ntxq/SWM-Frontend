import { useCallback } from "react";
import html2canvas from "html2canvas";
import { postImageResult } from "../../../../adapters/recognition";

function useImageCapture(requestID, cutID) {
  const downloadText = useCallback(async () => {
    const translateDiv = document.querySelector(".recognition_style");
    const translatedImage = document.querySelectorAll(".unselectable")[1];
    const naturalHeight = translatedImage.naturalHeight;
    const naturalWidth = translatedImage.naturalWidth;

    const widthRatio = naturalWidth / translatedImage.clientWidth;
    const heightRatio = naturalHeight / translatedImage.clientHeight;

    const canvas = await html2canvas(translateDiv, {
      backgroundColor: "null",
      height: naturalHeight,
      width: naturalWidth,
      windowHeight: Math.max(naturalHeight * 2, window.innerHeight),
      windowWidth: Math.max(naturalWidth * 5, window.innerWidth),

      onclone: (cloneDocument) => {
        const bboxList = cloneDocument.querySelectorAll(".bbox");
        for (const bbox of bboxList) {
          bbox.style.width =
            Number.parseInt(bbox.style.width) * widthRatio + "px";
          bbox.style.height =
            Number.parseInt(bbox.style.height) * heightRatio + "px";

          const translateX =
            bbox.computedStyleMap().get("transform")[0].x.value * widthRatio;
          const translateY =
            bbox.computedStyleMap().get("transform")[0].y.value * heightRatio;

          bbox.style.transform = `translate(${translateX}px, ${translateY}px)`;

          bbox.children[0].style.fontSize =
            Number.parseInt(bbox.children[0].style.fontSize) * heightRatio +
            "px";
        }
      },
    });

    // const a = document.createElement("a");
    // a.href = canvas.toDataURL("image/png");
    // a.download = "image.png";
    // a.click();

    postImageResult(requestID, cutID, canvas.toDataURL("image/png"));
  }, [requestID, cutID]);

  return downloadText;
}

export default useImageCapture;
