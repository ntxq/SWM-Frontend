import axios from "axios";
import FormData from "form-data";

const backendInstance = axios.create({
  baseURL: "http://13.124.109.41:3000",
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

  for (const image of imageSlice) {
    if (image.inpaint && image.id) {
      data.append("map_ids", image.id);
      await fetch(image.inpaint)
        .then((result) => result.blob())
        .then((blob) => new File([blob], image.filename, { type: blob.type }))
        .then((file) => data.append("blank", file));
    }
  }

  // for (const pair of data.entries()) console.log(pair);

  const result = await backendInstance
    .post("/upload/segmentation/blank", data)
    .then((response) => response.data.req_ids)
    .catch((error) => console.log(error));

  return result;
}
