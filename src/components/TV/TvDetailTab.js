import React from "react";

function TvDetailTab({ seasons }) {
  return (
    <div className="my-4 d-flex row">
      {seasons.map((season,index) => {
        if (season.poster_path) {
          return (
            <div key={index} className="col-2">
              <img className="tv-season-img" key={index} src={`https://image.tmdb.org/t/p/w342/${season.poster_path}`} alt=""/>
              <p key={index}>{season.name}</p>
            </div>
          )
        } else {
          return (
            <div key={index} className="col-2">
              <div className="no-image-tv">
                <span>No Image</span>
              </div>
              <p key={index}>{season.name}</p>
            </div>
          )
        }
      } )}
    </div>
  )
}

export default TvDetailTab