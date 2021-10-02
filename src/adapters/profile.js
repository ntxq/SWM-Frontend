import { backendInstance } from "./backend";

export async function getProfile() {
  const profile = await backendInstance
    .get("/api/profile")
    .then((response) => response.data);

  return profile;
}

export async function putProfile(newProfile) {
  const data = {
    params: {
      ...newProfile,
    },
  };

  await backendInstance.put("/api/profile", {}, data);

  return getProfile();
}
