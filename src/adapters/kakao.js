import { backendInstance } from "./backend";

const KAKAO_URL = "https://kauth.kakao.com";
const CLIENT_ID = "4ee38a9230dc15bb654d1a79386e0e7c";
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? window.location.origin + "/oauth"
    : "http://localhost:3000/oauth";

export const kakaoAuthCode = () =>
  KAKAO_URL +
  `/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const deleteKakaoToken = async () => {
  await backendInstance.get("/oauth/logout");
};
