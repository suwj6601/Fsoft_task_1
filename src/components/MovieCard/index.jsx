import React from "react";
import "./style.scss";

const MovieCard = (props) => {
  const { imgUrl, title } = props;
  return (
    <div className="card">
      <img src={imgUrl} alt="" />
      <p className="title">{title}</p>
    </div>
  );
};

export default MovieCard;
