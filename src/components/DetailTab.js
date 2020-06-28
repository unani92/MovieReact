import React, { useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";
import { recommendMovies } from "../store";
import { connect } from "react-redux"
import Movie from "./Movie";

const Container = styled.div
`
  position: relative;
  z-index:2;
`

function DetailTab({ movies, id, title, dispatch }) {
  const [recommendLoading, setRecommendLoading] = useState(true)
  const [youtubeLoading, setYoutubeLoading] = useState(true)
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const RECOMMEND_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations`

  const recommend = () => {
    const option = {params: {api_key: TMDB_API_KEY}}
    axios.get(RECOMMEND_URL,option)
      .then(res => {
        const {data:{results}} = res
        dispatch(recommendMovies(results))
        setRecommendLoading(false)
      })
  }
  const youtube = () => {}
  useEffect(recommend,[])
  return (
    <Container className="container my-4">
      <h1>DetailTabs</h1>
      {recommendLoading ? "loading" : (
        <div className="row">
          {movies.map((movie,index) => (
            <div key={index} className="col-4">
              <Movie key={index} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

function mapStateToProps(state, ownProps) {
  const { recommendReducer } = state
  const { id, title } = ownProps
  return { movies:recommendReducer, id, title }
}
function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailTab)