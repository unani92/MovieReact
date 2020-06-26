import React, { useState, useEffect } from "react";
import axios from 'axios'
import { connect } from "react-redux"
import { addMovies } from "../store";
import scrollMonitor from 'scrollmonitor'
import Movie from "./Movie"

function Home({ state, dispatch }) {
  const [isLoading,setIsLoading] = useState(true)
  const [isScroll, setScroll] = useState(1)

  function myaxios() {
    console.log(isScroll)
    axios.get(`https://finprojectapi.herokuapp.com/api/v1/community/movies/?page=${isScroll}`)
      .then(res => {
        dispatch(addMovies(res.data))
        if (isLoading) {setIsLoading(false)}
      })
      .catch(err => console.log(err))
  }
  useEffect(myaxios,[isScroll])

  if (!isLoading) {
    setTimeout(() => {
      const bottomSensor = document.getElementById("bottomSensor")
      const watcher = scrollMonitor.create(bottomSensor)
      watcher.enterViewport(() => setTimeout(
        () => setScroll(isScroll+1)
      ),500)
    },500)
  }

  return (
    <div className="container">
      {isLoading ? "is Loading" :
        (<div className="row">
          {state.map((movie,index) => (
            <div key={index} className="col-4">
              <Movie key={index} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
            </div>
          ))}
          <div id="bottomSensor"></div>
        </div>)
      }
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