import React from "react";
import { Button, Image } from "antd";

import { kakaoAuthCode } from "../../adapters/kakao";
import Kakao_Symbol from "./kakao_symbol.png";

function KakaoLogin(properties) {
  return (
    <Button
      type="text"
      className="login_form_kakao"
      onClick={() => (window.location.href = kakaoAuthCode())}
      icon={
        <Image src={Kakao_Symbol} preview={false} className="kakao_symbol" />
      }
    >
      Login with Kakao
    </Button>
  );
}

export default KakaoLogin;
