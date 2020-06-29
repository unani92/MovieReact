import React from "react";
import { connect } from "react-redux"
import Movie from "./Movie";
import _ from "lodash"

function Recommend({ movies }) {
  const randomMovies = _.sampleSize(movies,3)
  return (
    <div className="row">
      {randomMovies.map((movie,index) => (
        <div key={index} className="col-4">
          <Movie key={index} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
        </div>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  const { recommendReducer } = state
  return { movies: recommendReducer }
}

export default connect(mapStateToProps) (Recommend)