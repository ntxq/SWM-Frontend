import axios from "axios";
import FormData from "form-data";

const backendInstance = axios.create({
  baseURL: "http://13.124.109.41:3000",
});

export async function uploadOriginals(imageSlice) {
  const data = new FormData();

  for (const image of imageSlice) {
    await fetch(image[0])
      .then((result) => result.blob())
      .then((blob) => new File([blob], image[1], { type: blob.type }))
      .then((file) => {
        console.log(file);
        data.append("source", file);
      });
  }

  const response = await backendInstance
    .post("/upload/segmentation/source", data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  return response.data.req_ids;
}
