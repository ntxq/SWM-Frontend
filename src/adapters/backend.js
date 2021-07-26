import axios from "axios";
import FormData from "form-data";

const backendInstance = axios.create({
  baseURL: "http://3.36.117.231:3000",
});

export async function uploadOriginals(imageSlice) {
  const data = new FormData();

  for (const image of imageSlice) {
    await fetch(image.original)
      .then((result) => result.blob())
      .then((blob) => new File([blob], image.filename, { type: blob.type }))
      .then((file) => data.append("source", file));
  }

  // for (const pair of data.entries()) console.log(pair);

  const result = await backendInstance
    .post("/upload/segmentation/source", data)
    .then((response) => response.data.req_ids)
    .catch((error) => console.log(error));

  return result;
}

export async function uploadBlank(imageSlice) {
  const data = new FormData();
  const idList = [];
  const emptyList = [];

  for (const image of imageSlice) {
    if (image.inpaint && image.id) {
      idList.push(image.id);
      await fetch(image.inpaint)
        .then((result) => result.blob())
        .then((blob) => new File([blob], image.filename, { type: blob.type }))
        .then((file) => data.append("blank", file));
    } else if (image.id) {
      emptyList.push(image.id);
    }
  }

  data.append("map_ids", JSON.stringify(idList));
  data.append("empty_id", JSON.stringify(emptyList));

  // for (const pair of data.entries()) console.log(pair);

  const result = await backendInstance
    .post("/upload/segmentation/blank", data)
    .then((response) => response.data.req_ids)
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationResult(request_id) {
  const data = {
    req_id: request_id,
  };

  const result = await backendInstance
    .get("/upload/segmentation/result", data)
    .then((response) => response.data.complete)
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationInpaint(request_id) {
  const data = {
    req_id: request_id,
  };

  const result = await backendInstance
    .get("/upload/segmentation/result/inpaint", data)
    .then((response) => response.data.inpaint)
    .catch((error) => console.log(error));

  return result;
}

export async function getSegmentationMask(request_id) {
  const data = {
    req_id: request_id,
  };

  const result = await backendInstance
    .get("/upload/segmentation/result/inpaint", data)
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
    req_id: request_id,
  };

  const result = await backendInstance
    .get("/upload/OCR/select", data)
    .then((response) => response.data.success)
    .catch((error) => console.log(error));

  return result;
}
