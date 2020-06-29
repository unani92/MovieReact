import React from "react";

function Tv({ id, title, poster_path }) {
  return (
    <div className="m-4">
      <div>
        <a href={`/tv/${id}`}>
          {poster_path ?
            (<img className="movie-poster-link" id={id} src={`https://image.tmdb.org/t/p/w342/${poster_path}`}  alt=""/>)
            : (<div className="no-image"><h3>No Image</h3></div>)
          }
        </a>
        <p className="text-center font-weight-bold">{title}</p>
      </div>
    </div>
  )
}

export default Tv