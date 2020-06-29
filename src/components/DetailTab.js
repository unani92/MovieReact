import React, { useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";
import { recommendMovies, youtubeMovies } from "../store";
import { connect } from "react-redux"
import Recommend from "./Recommend";
import Youtube from "./Youtube";

const Container = styled.div
`
  position: relative;
  z-index:2;
`
function handleClick(event) {
  const recommend = document.getElementById("recommend")
  const youtube = document.getElementById("youtube")
  const recommendBtn = document.getElementById("recommendBtn")
  const youtubeBtn = document.getElementById("youtubeBtn")
  if (event.target.id === "recommendBtn") {
    youtube.classList.add("disabled")
    recommend.classList.remove("disabled")
    event.target.setAttribute("disabled",true)
    youtubeBtn.removeAttribute("disabled")
  } else {
    youtube.classList.remove("disabled")
    recommend.classList.add("disabled")
    event.target.setAttribute("disabled",true)
    recommendBtn.removeAttribute("disabled")
  }
}
function DetailTab({ id, original_title, dispatch }) {
  const [recommendLoading, setRecommendLoading] = useState(true)
  const [youtubeLoading, setYoutubeLoading] = useState(true)
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
  const RECOMMEND_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations`
  const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search'
  const recommend = () => {
    const option = {params: {api_key: TMDB_API_KEY}}
    axios.get(RECOMMEND_URL,option)
      .then(res => {
        const {data:{results}} = res
        dispatch(recommendMovies(results))
        setRecommendLoading(false)
      })
  }
  const youtube = () => {
    const option = {
      params: {
        key: YOUTUBE_API_KEY,
        part: "snippet",
        type: "video",
        q: original_title + " official trailer"
      }
    }
    axios.get(YOUTUBE_URL,option)
      .then(res => {
        const {data:{items}} = res
        dispatch(youtubeMovies(items[0]))
        setYoutubeLoading(false)
      })
  }

  useEffect(recommend,[])
  useEffect(youtube,[])

  return (
    <Container className="container my-4">
      <div className="container my-3 btnTab">
        <button className="btn btn-warning text-light font-weight-bold mr-3" onClick={handleClick} id="recommendBtn">Random Recommend</button>
        <button className="btn btn-warning text-light font-weight-bold" onClick={handleClick} id="youtubeBtn">Official Trailer</button>
      </div>
      {!recommendLoading && !youtubeLoading ? (
        <div>
          <div id="recommend" className="disabled">
            <Recommend/>
          </div>
          <div id="youtube">
            <Youtube/>
          </div>
        </div>
      ) : "Loading"}
    </Container>
  )
}

function mapStateToProps(state, ownProps) {
  const { id, original_title } = ownProps
  return { id, original_title }
}
function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailTab)