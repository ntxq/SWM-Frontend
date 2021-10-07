import React from "react";
import Template from "./template";
import PreferenceCard from "../components/Preference/preference-card";
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
      <PreferenceCard />
    </Template>
  );
}

export default Preference;
