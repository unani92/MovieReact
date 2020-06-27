import React, { useState } from "react";
import { connect } from "react-redux"
import { searchMovies } from "../store";
import styled from "styled-components";
import axios from 'axios'
import Movie from "../components/Movie";

//stylesheet
const Input = styled.input
`
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 3px solid black;
`

// react component
function Search({ result, dispatch }) {
  const REACT_APP_TMDB_API_KEY=process.env.REACT_APP_TMDB_API_KEY
  const searchMovie = () => {
    if (keyword) {
      const option = {
        params: {
          query:keyword,
          language:"ko-KR",
          include_adult:true
        }
      }
      axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${REACT_APP_TMDB_API_KEY}`,option)
        .then(res => {
          const { data:{results} } = res
          dispatch(searchMovies(results))
        })
    }
  }
  const [keyword, setKeyword] = useState("")
  const onChange = event => setKeyword(event.target.value)
  const onClick = () => searchMovie()
  const onSubmit = (event) => {
    event.preventDefault()
    searchMovie()
  }
  return (
    <div className="my-5 container text-center">
      <form onSubmit={onSubmit} className="input-box">
        <Input onChange={onChange} className="Input" type="text" placeholder="영화를 검색합니다"/>
        <i onClick={onClick} typeof="submit" className="fas fa-search"/>
      </form>
      {!result ? (<div/>) :
        (<div className="row">
          {result.map((movie,index) => (
            <div key={index} className="col-4">
              <Movie key={index} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
            </div>
          ))}
        </div>)
      }
    </div>
  )
}

function mapStateToProps(state) {
  const { searchReducer } = state
  return { result: searchReducer }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps,mapDispatchToProps) (Search)