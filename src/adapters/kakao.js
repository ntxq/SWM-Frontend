import axios from "axios";

const KAKAO_URL = "https://kauth.kakao.com";
const CLIENT_ID = "4ee38a9230dc15bb654d1a79386e0e7c";
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "http://ec2-3-38-47-70.ap-northeast-2.compute.amazonaws.com:3000/oauth"
    : "http://localhost:3000/oauth";

const kakaoInstance = axios.create({
  baseURL: KAKAO_URL,
});

export const kakaoAuthCode = () =>
  KAKAO_URL +
  `/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
