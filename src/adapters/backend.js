import axios from "axios";
import FormData from "form-data";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const backendInstance = axios.create({
  baseURL: url,
});

export async function uploadOriginals(imageSlice, projectTitle) {
  const data = new FormData();

  data.append("title", projectTitle);

  for (const image of imageSlice) {
    await fetch(image.original)
      .then((result) => result.blob())
      .then((blob) => new File([blob], image.filename, { type: blob.type }))
      .then((file) => data.append("source", file));
  }

  const result = await backendInstance
    .post("/upload/segmentation/source", data)
    .then((response) => response.data.req_ids)
    .catch(() => ({
      req_ids: [],
    }));

  return result;
}

export async function uploadBlank(imageSlice, request_ids) {
  const data = new FormData();
  const idList = [];
  const emptyList = [];

  for (const image of imageSlice) {
    if (image.inpaint && request_ids.hasOwnProperty(image.filename)) {
      idList.push(request_ids[image.filename].req_id);
      await fetch(image.inpaint)
        .then((result) => result.blob())
        .then((blob) => new File([blob], image.filename, { type: blob.type }))
        .then((file) => data.append("blank", file));
    } else if (request_ids.hasOwnProperty(image.filename)) {
      emptyList.push(request_ids[image.filename].req_id);
    }
  }

  data.append("map_ids", JSON.stringify(idList));
  data.append("empty_id", JSON.stringify(emptyList));

  const result = await backendInstance
    .post("/upload/segmentation/blank", data)
    .then((response) => response.data.req_ids)
    .catch(() => ({
      req_ids: [],
    }));

  return result;
}

export async function getCutImage(request_id, cutIndex) {
  return await fetch(
    url + `/upload/segmentation/cut?req_id=${request_id}&cut_id=${cutIndex}`
  )
    .then((response) => {
      if (response.ok) return response;
      else throw new Error("Server Error");
    })
    .then((image) => image.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch(() => getCutImage(request_id, cutIndex));
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

export async function uploadEdit(request_id, cutID, bboxList) {
  const data = {
    req_id: request_id,
    cut_id: cutID,
    bboxList: JSON.stringify(bboxList),
  };

  const result = await backendInstance
    .post("/upload/OCR/edit", data)
    .then((response) => response.data.success)
    .catch((error) => console.error(error));

  return result;
}
