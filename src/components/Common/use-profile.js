import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../contexts/profile-slice";

function useProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile.username === "") {
      let profileCookie;

      if (document.cookie) {
        profileCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("profile="))
          .split("=")[1];
        profileCookie = decodeURIComponent(profileCookie);
        profileCookie = JSON.parse(profileCookie);
      }

      if (!profileCookie || profileCookie.username === "") {
        profileCookie = {
          username: "myname",
          email: "useremail@test.com",
          createTime: new Date().toISOString(),
        };
      }

      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      profileCookie.createTime = new Date(
        profileCookie.createTime
      ).toLocaleDateString("en-US", dateOptions);

      dispatch(updateProfile(profileCookie));
    }
  }, [dispatch, profile]);

  return profile;
}

export default useProfile;
