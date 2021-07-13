import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "antd";

function DashBoard(props) {
  const webtoons = useSelector((state) => state.webtoon.images);

  return (
    <>
      <Link to='/'>
        Home
      </Link>
      {webtoons.map((url) => (
        <Image src={url} />
      ))}
    </>
  );
}

export default DashBoard;
