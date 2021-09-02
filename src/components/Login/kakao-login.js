import React from "react";
import { Image } from "antd";
import { kakaoAuthCode } from "../../adapters/kakao";

import KakaoImage from "./kakao_image.png";

function KakaoLogin(properties) {
  return (
    <Image
      src={KakaoImage}
      preview={false}
      onClick={() => (window.location.href = kakaoAuthCode())}
    />
  );
}

export default KakaoLogin;
