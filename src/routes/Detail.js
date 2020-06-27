import React from "react";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

function Detail({movie}) {
  return (
    <div className="my-5">
      <div className="container">
        <h1 className="text-center">{ movie.title }</h1>
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const location = ownProps.location.prev
  const {match:{params:{id}}} = ownProps
  if (location === "/") {
      const { homeReducer } = state
      return {movie: homeReducer.find(movie => Number(movie.id) === Number(id))}
  } else {
      const { searchReducer } = state
      return {movie: searchReducer.find(movie => Number(movie.id) === Number(id))}
  }
}

export default connect(mapStateToProps,null) (withRouter(Detail))