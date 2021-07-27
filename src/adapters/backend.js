import axios from "axios";
import FormData from "form-data";

const url = "http://3.36.117.231:3000";

const backendInstance = axios.create({
  baseURL: url,
});

export async function uploadOriginals(imageSlice) {
  const data = new FormData();

  for (const image of imageSlice) {
    await fetch(image.original)
      .then((result) => result.blob())
      .then((blob) => new File([blob], image.filename, { type: blob.type }))
      .then((file) => data.append("source", file));
  }

  const result = await backendInstance
    .post("/upload/segmentation/source", data)
    .then((response) => response.data.req_ids)
    .catch((error) => console.log(error));

  return result;
}

export async function uploadBlank(imageSlice, request_ids) {
  const data = new FormData();
  const idList = [];
  const emptyList = [];

  for (const image of imageSlice) {
    if (image.inpaint && request_ids.hasOwnProperty(image.filename)) {
      idList.push(request_ids[image.filename]);
      await fetch(image.inpaint)
        .then((result) => result.blob())
        .then((blob) => new File([blob], image.filename, { type: blob.type }))
        .then((file) => data.append("blank", file));
    } else if (request_ids.hasOwnProperty(image.filename)) {
      emptyList.push(request_ids[image.filename]);
    }
  }

  data.append("map_ids", JSON.stringify(idList));
  data.append("empty_id", JSON.stringify(emptyList));

  const result = await backendInstance
    .post("/upload/segmentation/blank", data)
    .then((response) => response.data.req_ids)
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationResult(request_id) {
  const data = {
    params: {
      req_id: request_id,
    },
  };

  const result = await backendInstance
    .get("/upload/segmentation/result", data)
    .then((response) => response.data.complete)
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationInpaint(request_id) {
  const result = await fetch(
    url + `/upload/segmentation/result/inpaint?req_id=${request_id}`
  )
    .then((response) => response.blob())
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationMask(request_id) {
  const data = {
    params: {
      req_id: request_id,
    },
  };

  const result = await backendInstance
    .get("/upload/segmentation/result/mask", data)
    .then((response) => response.data.mask)
    .catch((error) => console.log(error));

  return result;
}

export async function uploadMask(request_id, mask) {
  const data = {
    req_id: request_id,
    mask: JSON.stringify({
      result: mask,
    }),
  };

  const result = await backendInstance
    .post("/upload/segmentation/mask", data)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return result;
}

export async function selectOCR(request_id) {
  const data = {
    params: {
      req_id: request_id,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/select", data)
    .then((response) => response.data.success)
    .catch((error) => console.log(error));

  return result;
}

export async function getOCRResult(request_id) {
  const data = {
    params: {
      req_id: request_id,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/result", data)
    .then((response) => response.data.success)
    .catch((error) => console.log(error));

  return result;
}

export async function getOCRResultBbox(request_id) {
  const data = {
    params: {
      req_id: request_id,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/result/edit", data)
    .then((response) => response.data.bboxList)
    .catch((error) => console.log(error));

  return result;
}

export async function uploadEdit(request_id, bboxList) {
  const data = {
    req_id: request_id,
    bboxList,
  };

  const result = await backendInstance
    .post("/upload/OCR/edit", data)
    .then((response) => response.data.success)
    .catch((error) => console.log(error));

  return result;
}

export async function uploadStyles(request_id, styleList) {
  const data = {
    params: {
      req_id: request_id,
      bboxList: styleList,
    },
  };

  const result = await backendInstance
    .get("/upload/OCR/styles", data)
    .then((response) => response.data.success)
    .catch((error) => console.log(error));

  return result;
}
