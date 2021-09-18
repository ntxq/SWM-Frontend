import React from "react";
import { Button, Card, Divider } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

import Template from "./template";
import AvatarBlock from "../components/Preference/avatar-block";
import AccountBlock from "../components/Preference/account-block";
import DeleteBlock from "../components/Preference/delete-block";
import "../styles/Preference.css";

function Preference(properties) {
  return (
    <Template
      className="preference"
      defaultMenu="preference"
      headerClass="header"
      contentClass="content"
      footerClass="footer"
    >
      <Card
        extra={
          <div className="preference_save">
            <Button type="primary" icon={<SaveOutlined />} />
            <Button icon={<DeleteOutlined />} />
          </div>
        }
      >
        <AvatarBlock />
        <Divider />
        <AccountBlock />
        <Divider />
        <DeleteBlock />
      </Card>
    </Template>
  );
}

export default Preference;
