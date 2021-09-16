import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const backendInstance = axios.create({
  baseURL: url,
});

export async function createProject(imageSlice, title) {
  const filenames = [];
  for (const image of imageSlice) filenames.push(image.filename);

  const data = {
    title,
    filenames,
  };

  const request_array = await backendInstance
    .post("/upload/segmentation/project", data)
    .then((response) => response.data.request_array);

  const imageMap = {};
  for (const image of imageSlice) {
    const { req_id, s3_url, s3_blank_url } = request_array.find(
      (info) => info.filename === image.filename
    );

    const originalFile = await fetch(image.original)
      .then((result) => result.blob())
      .then((blob) => new File([blob], image.filename, { type: blob.type }));

    await axios.put(s3_url, originalFile, {
      headers: { "Content-Type": originalFile.type },
    });
    await backendInstance
      .post("/upload/segmentation/source", {
        req_id,
      })
      .then((response) => response.data.cut_count)
      .then((cut_count) => {
        imageMap[image.filename] = {
          req_id,
          cut_count,
        };
      });

    if (image.inpaint) {
      const blankFile = await fetch(image.inpaint)
        .then((result) => result.blob())
        .then((blob) => new File([blob], image.filename, { type: blob.type }));

      await axios.put(s3_blank_url, blankFile, {
        headers: { "Content-Type": blankFile.type },
      });
      await backendInstance.post("/upload/segmentation/blank", {
        req_id,
      });
    }
  }

  return imageMap;
}

export function getCutImageURL(request_id, cutIndex) {
  return (
    url + `/upload/segmentation/cut?req_id=${request_id}&cut_id=${cutIndex}`
  );
}

export async function postSegmentationStart(request_id) {
  return await backendInstance
    .post("/upload/segmentation/start", {
      req_id: request_id,
    })
    .then((response) => response.data.success);
}

export async function getSegmentationResult(request_id, cutIndex) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutIndex,
    },
  };

  const result = await backendInstance
    .get("/upload/segmentation/result", data)
    .then((response) => response.data.progress)
    .catch((error) => console.error(error));

  return result;
}

export async function getSegmentationInpaint(request_id, cutID) {
  return await fetch(
    url +
      `/upload/segmentation/result/inpaint?req_id=${request_id}&cut_id=${cutID}`
  ).then((image) => image.blob());
}

export function getSegmentationInpaintURL(request_id, cutID) {
  return (
    url +
    `/upload/segmentation/result/inpaint?req_id=${request_id}&cut_id=${cutID}`
  );
}

export async function getSegmentationMask(request_id, cutID) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutID,
    },
  };

  const result = await backendInstance
    .get("/upload/segmentation/result/mask", data)
    .then((response) => response.data.mask)
    .catch((error) => {});

  return result;
}

export async function uploadMask(request_id, cutID, mask) {
  const data = {
    req_id: request_id,
    cut_id: cutID,
    mask: JSON.stringify({
      result: mask,
    }),
  };

  const result = await backendInstance
    .post("/upload/segmentation/mask", data)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return result;
}

export async function selectOCR(request_id, cutID) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutID,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/select", data)
    .then((response) => response.data.success)
    .catch((error) => console.error(error));

  return result;
}

export async function getOCRResult(request_id, cutID) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutID,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/result", data)
    .then((response) => response.data.progress)
    .then((progress) => (progress === null ? 100 : progress))
    .catch((error) => console.error(error));

  return result;
}

export async function getOCRResultBbox(request_id, cutID) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutID,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/result/bbox", data)
    .then((response) => response.data.bboxList)
    .catch((error) => console.error(error));

  return result;
}
