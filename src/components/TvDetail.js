import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { detailMovies } from "../store";
import axios from "axios"
import styled from "styled-components";
import DetailTab from "../components/DetailTab";

const Background = styled.div
`
  position: absolute;
  margin-top : 45px;
  background-color: black;
  background-size : cover;
  background-position: center center;
  background-repeat: no-repeat;
  top:0;
  left:0;
  width:100%;
  height:1100px;
  filter: blur(3px);
  opacity: 0.3;
  z-index: 1;
`
const Content = styled.div
`
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top : 50px;
  z-index:2;
`
const Img = styled.img
`
  @media (max-width: 700px) {
    display: none
  }
`

function TvDetail({ id,tv,dispatch }) {
  const [isLoading,setIsLoading] = useState(true)
  const { backdrop_path, genres, first_air_date, origin_country, homepage, seasons, name, poster_path, episode_run_time, overview, vote_average } = tv
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}`
  const fetchDetail = () => {
    const options = {
      params: {
        api_key: TMDB_API_KEY,
        language: 'ko-KR'
      }
    }
    axios.get(URL,options)
      .then(res => {
        dispatch(detailMovies(res.data))
        setIsLoading(false)
      })
      .catch(err => alert(err))
  }
  useEffect(fetchDetail,[])
  return (
    <div className="my-4">
      {isLoading ? "Loading" :
        (
          <div>
            <Background style={{backgroundImage:`url(https://image.tmdb.org/t/p/w342${backdrop_path})`}}/>
            <Content className="container">
              <div className="mr-4">
                <Img src={`https://image.tmdb.org/t/p/w342${poster_path}`} alt=""/>
              </div>
              <div>
                <h4 className="text-center mb-5">{name} {`(${first_air_date.slice(0,4)})`}</h4>
                <h5>RATING : {vote_average}</h5>
                <h5>EPISODE: {episode_run_time} 회</h5>
                <h5 className="my-3">Overview</h5>
                <p>{overview}</p>
                <div className="d-flex my-3">
                  <h5 className="mr-3">GENRES </h5>
                  <div>
                    {genres.map((genre,index) =>
                      (<span
                        className="badge badge-success mr-2"
                        key={index}>
                      {genre.name}
                    </span>))}
                  </div>
                </div>
                <div className="d-flex my-3">
                  <h5 className="mr-3">COUNTRY</h5>
                  <div>
                    {origin_country.map((country,index) =>
                      (<span
                        className="badge badge-dark mr-2"
                        key={index}>
                      {country}
                    </span>))}
                  </div>
                </div>
                <div className="d-flex my-3">
                  <h5 className="mr-3">Homepage</h5>
                  <div>
                    <a href={homepage}>
                      <span className="badge badge-primary mr-2">Link</span>
                    </a>
                  </div>
                </div>
              </div>
            </Content>
            {/*<DetailTab id={id} original_title={original_name} />*/}
          </div>
        )
      }
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id
  const { detailReducer } = state
  return {
    id: id,
    tv: detailReducer
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps,mapDispatchToProps) (TvDetail)