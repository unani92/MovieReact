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
  height:2000px;
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

function Detail({ id,movie,dispatch }) {
  const [isLoading,setIsLoading] = useState(true)
  const { title, overview, release_date, backdrop_path, poster_path, genres, imdb_id, production_countries, vote_average } = movie
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/movie/${id}`
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
                <h4 className="text-center mb-3">{title} {`(${release_date.slice(0,4)})`}</h4>
                <h5>RATING : {vote_average}</h5>
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
                  <h5 className="mr-3">COUNTRY </h5>
                  <div>
                    {production_countries.map((country,index) =>
                      (<span
                      className="badge badge-dark mr-2"
                      key={index}
                      >
                        {country.name}
                      </span>))}
                  </div>
                </div>
              </div>
            </Content>
            <DetailTab id={id} title={title} />
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
    movie: detailReducer
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps,mapDispatchToProps) (Detail)