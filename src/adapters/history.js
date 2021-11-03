import { backendInstance } from "./backend";

export async function getProjects(page = 0) {
  const data = {
    params: {
      page,
    },
  };

  const result = await backendInstance
    .get("/api/history/projects", data)
    .then((response) => response.data.projects);

  return result;
}

export async function getCompleteImage(requestID) {
  const data = {
    params: {
      req_id: requestID,
    },
  };

  const result = await backendInstance
    .get("/api/history/download", data)
    .then((response) => response.data.s3_url);

  return result;
}
