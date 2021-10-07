import { message } from "antd";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { deleteKakaoToken } from "../../adapters/kakao";

function useLogout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    const reset = new URLSearchParams(location.search).get("reset");

    if (reset) {
      deleteKakaoToken();
      dispatch({ type: "RESET_STORE" });
      message.success("Succesfully loggged out");
    }
  }, [dispatch, location.search]);
}

export default useLogout;
