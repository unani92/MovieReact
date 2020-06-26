import React, { useState, useEffect } from "react";
import axios from 'axios'
import { connect } from "react-redux"
import { addMovies } from "../store";
import scrollMonitor from 'scrollmonitor'
import Movie from "./Movie"

function Home({ state, dispatch }) {
  const [isLoading,setIsLoading] = useState(true)
  const [isScroll, setScroll] = useState(0)

  function myaxios() {
    setScroll(isScroll+1)
    axios.get(`https://finprojectapi.herokuapp.com/api/v1/community/movies/?page=${isScroll}`)
      .then(res => {
        dispatch(addMovies(res.data))
        setIsLoading(false)
        console.log(state)
      })
      .catch(err => console.log(err))
  }
  // function addScroll() {
  //   const bottomSensor = document.querySelector("#bottomSensor")
  //   const watcher = scrollMonitor.create(bottomSensor)
  //   watcher.enterViewport(() => myaxios())
  // }
  // useEffect(addScroll)
  useEffect(myaxios,[isScroll])
  return (
    <div className="container">
      <div className="row">
        {isLoading ? "loading" :
          state.map(movie => (
            <div className="col-4">
              <Movie key={Date.now()} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
            </div>
            )
          )
        }
      </div>
      <div id="bottomSensor"></div>
    </div>
  )
}
function mapStateToProps(state) {
  return { state }
}
function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home)