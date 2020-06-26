import React, { useState, useEffect } from "react";
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
  const searchMovie = () => {
    if (keyword) {
      const option = {
        params: {q:keyword}
      }
      axios.get("https://finprojectapi.herokuapp.com/api/v1/community/movies/",option)
        .then(res => {
          dispatch(searchMovies(res.data))
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
  return { result: state }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps,mapDispatchToProps) (Search)