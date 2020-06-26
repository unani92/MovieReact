import React from "react";
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
  const {match:{params:{id}}} = ownProps
  return {movie: state.find(movie => Number(movie.id) === Number(id))}
}

export default connect(mapStateToProps,null) (Detail)