import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../adapters/profile";
import { updateProfile } from "../../contexts/profile-slice";

function useProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile.username === "") {
      getProfile().then((newProfile) =>
        dispatch(
          updateProfile({
            username: newProfile.username,
            email: newProfile.email,
            createTime: newProfile.create_time,
            avatar: newProfile.pic_path,
          })
        )
      );
    }
  }, [dispatch, profile]);

  return profile;
}

export default useProfile;
