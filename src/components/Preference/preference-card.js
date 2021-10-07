import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Divider } from "antd";

import AccountBlock from "./account-block";
import AvatarBlock from "./avatar-block";
import DeleteBlock from "./delete-block";
import PreferenceControl from "./preference-control";
import useProfileUpdate from "./use-profile-update";

function PreferenceCard(properties) {
  const profile = useSelector((state) => state.profile);
  const updateProfile = useProfileUpdate();

  const [temporaryName, setTemporaryName] = useState(profile.username);
  const [temporaryEmail, setTemporaryEmail] = useState(profile.email);

  const handleProfileChange = useCallback(() => {
    const data = {};
    if (temporaryName !== profile.username) data.username = temporaryName;
    if (temporaryEmail !== profile.email) data.email = temporaryEmail;
    if (Object.keys(data).length > 0) updateProfile(data);
  }, [
    profile.username,
    profile.email,
    temporaryName,
    temporaryEmail,
    updateProfile,
  ]);

  return (
    <Card extra={<PreferenceControl submitChange={handleProfileChange} />}>
      <AvatarBlock />
      <Divider />
      <AccountBlock
        nameChange={setTemporaryName}
        emailChange={setTemporaryEmail}
      />
      <Divider />
      <DeleteBlock />
    </Card>
  );
}

export default PreferenceCard;
