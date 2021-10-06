import { backendInstance } from "./backend";

export async function selectOCR(request_id, cut_id) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cut_id,
    },
  };

  const result = await backendInstance
    .get("/api/OCR/select", data)
    .then((response) => response.data.success)
    .catch((error) => console.error(error));

  return result;
}

export async function getOCRResult(request_id, cut_id) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cut_id,
    },
  };

  const result = await backendInstance
    .get("/api/OCR/result", data)
    .then((response) => response.data.progress)
    .then((progress) => (progress === null ? 100 : progress))
    .catch((error) => console.error(error));

  return result;
}

export async function getOCRResultBbox(request_id, cut_id) {
  const data = {
    params: {
      req_id: request_id,
      cut_id: cut_id,
    },
  };

  const result = await backendInstance
    .get("/api/OCR/result/bbox", data)
    .then((response) => response.data.bboxList)
    .catch((error) => console.error(error));

  return result;
}

export async function postOCRTranslate(request_id, cut_id, translate_id) {
  const data = {
    req_id: request_id,
    cut_id: cut_id,
    translate_id: translate_id,
  };

  const result = await backendInstance
    .post("/api/OCR/translate", data)
    .then((response) => response.data.translated);

  return result;
}

export async function postOCRText(
  request_id,
  cut_id,
  bboxList,
  translatedBoxList
) {
  const data = {
    req_id: request_id,
    cut_id: cut_id,
    bboxList: bboxList,
    translatedBoxList: translatedBoxList,
  };

  const result = await backendInstance
    .post("/api/OCR/text", data)
    .then((response) => response.data.success);

  return result;
}

export async function postImageResult(request_id, cut_id, image) {
  const data = {
    req_id: request_id,
    cut_id: cut_id,
    final_image: image,
  };

  const result = await backendInstance
    .post("/api/OCR/image", data)
    .then((response) => response.data.success);

  return result;
}
