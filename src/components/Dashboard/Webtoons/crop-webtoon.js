import React, { useEffect, useRef } from "react";

function CropImage(properties) {
  const canvasReference = useRef();

  useEffect(() => {
    const image = new Image(properties.url);
    image.src = properties.url;

    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");

    function cropImage() {
      const widthScale = context.canvas.width / image.naturalWidth;

      context.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        context.canvas.height / widthScale,
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
    }

    image.addEventListener("load", cropImage);

    return () => image.removeEventListener("load", cropImage);
  }, [canvasReference, properties.url]);

  return <canvas ref={canvasReference} className="dashboard_image" />;
}

export default CropImage;
