import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../contexts/profile-slice";
import { putProfile } from "../../adapters/profile";

function useProfileUpdate() {
  const dispatch = useDispatch();

  const saveProfile = useCallback(
    async (changedProfile) => {
      const newProfile = await putProfile(changedProfile);
      dispatch(
        updateProfile({
          username: newProfile.username,
          email: newProfile.email,
          createTime: newProfile.create_time,
          avatar: newProfile.pic_path,
        })
      );
    },
    [dispatch]
  );

  return saveProfile;
}

export default useProfileUpdate;
