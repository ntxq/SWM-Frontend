import { backendInstance } from "./backend";

export async function getProfile() {
  const profile = await backendInstance
    .get("/upload/profile")
    .then((response) => response.data);

  return profile;
}

export async function putProfile(newProfile) {
  const data = {
    params: {
      ...newProfile,
    },
  };

  await backendInstance.put("/upload/profile", {}, data);

  return getProfile();
}
