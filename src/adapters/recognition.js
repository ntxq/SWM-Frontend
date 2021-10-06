import { backendInstance } from "./backend";

export async function selectOCR(request_id, cutID) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cutID,
    },
  };

  const result = await backendInstance
    .get("/api/OCR/select", data)
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
    .get("/api/OCR/result", data)
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
    .get("/api/OCR/result/bbox", data)
    .then((response) => response.data.bboxList)
    .catch((error) => console.error(error));

  return result;
}

export async function postImageResult(request_id, cutID, image) {
  const data = {
    req_id: request_id,
    cut_id: cutID,
    final_image: image,
  };

  const result = await backendInstance
    .post("/api/OCR/image", data)
    .then((response) => response.data.success);

  return result;
}
