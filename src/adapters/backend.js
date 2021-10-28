import axios from "axios";

export const url =
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
    .post("/api/segmentation/project", data)
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
      .post("/api/segmentation/source", {
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
      await backendInstance.post("/api/segmentation/blank", {
        req_id,
      });
    }
  }

  return imageMap;
}
