import { url, backendInstance } from "./backend";

export function getCutImageURL(request_id, cutIndex) {
  return url + `/api/segmentation/cut?req_id=${request_id}&cut_id=${cutIndex}`;
}

export async function postSegmentationStart(request_id) {
  return await backendInstance
    .post("/api/segmentation/start", {
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
    .get("/api/segmentation/result", data)
    .then((response) => response.data.progress)
    .catch((error) => console.error(error));

  return result;
}

export function getSegmentationInpaintURL(request_id, cutID) {
  return (
    url +
    `/api/segmentation/result/inpaint?req_id=${request_id}&cut_id=${cutID}`
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
    .get("/api/segmentation/result/mask", data)
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
    .post("/api/segmentation/mask", data)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return result;
}
