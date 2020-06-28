import React, { useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";

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
`

function Detail({match:{params:{id}}}) {
  const [isLoading,setIsLoading] = useState(true)
  let [movie, setMovie] = useState([])
  const {title, overview, release_date, backdrop_path, poster_path, genres, imdb_id, production_countries,spoken_languages, vote_average} = movie
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
        setMovie(movie=res.data)
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
                <img src={`https://image.tmdb.org/t/p/w342${poster_path}`} alt=""/>
              </div>
              <div>
                <h4 className="text-center">{title} {`(${release_date.slice(0,4)})`}</h4>
                <h4>평점 : {vote_average}</h4>
                <p>{overview}</p>
                <div className="d-flex">
                  <h4 className="mr-3">장르:</h4>
                  <div>
                    {genres.map((genre,index) =>
                      (<span
                        className="badge badge-success mr-2"
                        key={index}>
                      {genre.name}
                    </span>))}
                  </div>
                </div>
              </div>
            </Content>
          </div>

        )
      }
    </div>
  )
}

export default Detail