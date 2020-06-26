import React from "react";

function Movie({ id, title, poster_path }) {
  return (
    <div>
      <div>
        <p>{title}</p>
        <img className="homeMovie" id={id} src={`https://image.tmdb.org/t/p/w342/${poster_path}`}  alt=""/>
      </div>
    </div>
  )
}

export default Movie