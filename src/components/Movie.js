import React from "react";
import { Link } from "react-router-dom";

function Movie({ id, title, poster_path }) {
  return (
    <div className="m-4">
      <div>
        <p className="text-center font-weight-light">{title}</p>
        <Link to={`/${id}`}>
          <img className="homeMovie" id={id} src={`https://image.tmdb.org/t/p/w342/${poster_path}`}  alt=""/>
        </Link>
      </div>
    </div>
  )
}

export default Movie