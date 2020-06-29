import React from "react";
import { connect } from "react-redux"

function Youtube({ video }) {
  const {id:{videoId}} = video
  const videoURL = `https://www.youtube.com/embed/${videoId}`
  return (
    <div className="video container embed-responsive embed-responsive-16by9">
      <iframe src={videoURL} frameBorder="0"/>
    </div>

  )
}

function mapStateToProps(state) {
  const { youtubeReducer } = state
  return { video: youtubeReducer }
}

export default connect(mapStateToProps) (Youtube)