import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function DashboardTitle(properties) {
  const { webtoonIndex } = useParams();

  const projectTitle = useSelector((state) => state.webtoons.form.title);
  const indexTitle = useSelector(
    (state) => state.webtoons.images?.[webtoonIndex]?.filename
  );
  const dashboardSize = useSelector((state) =>
    webtoonIndex
      ? state.webtoons.images[webtoonIndex].cutCount
      : state.webtoons.images.length
  );

  return (
    <Typography.Title className="project_title">
      <Link to="/dashboard">{projectTitle}</Link>
      {(indexTitle ? ` / ${indexTitle}` : "") + ` (${dashboardSize})`}
    </Typography.Title>
  );
}

export default DashboardTitle;
