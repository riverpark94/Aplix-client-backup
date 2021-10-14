import React from "react";
import "./MovieList.css";

function MovieListEntry(props) {
  // console.log(props);
  const { title, actor, director, image, pubDate, userRating } = props.movies;
  const { makeWishList } = props;

  return (
    <li className="movieEntry">
      <div className="poster">
        <img
          src={image}
          alt={title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
        />
      </div>
      <div className="movieinfo">
        <h3>
          {title
            .replace(/<b>/gi, "")
            .replace(/<\/b>/gi, "")
            .replace(/&amp;/gi, "")}
        </h3>
        <div className="detail">
          <p>감독 : {director}</p>
          <p>출연배우 : {actor.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}</p>
          <p>제작년도 : {pubDate}</p>
          <p>유저평점 : {userRating}</p>
        </div>
        <button
          className="btn_movieWish"
          onClick={(e) => {
            makeWishList(e, props.movies);
          }}
        >
          ♥ 찜하기
        </button>
      </div>
    </li>
  );
}

export default MovieListEntry;
