import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { addMovies } from "../store";
import Movie from "./Movie"
import axios from 'axios'
import scrollMonitor from 'scrollmonitor'

function Home({ state, dispatch }) {
  const [isLoading,setIsLoading] = useState(true)
  const [pageNum, setPageNum] = useState(1)

  function myaxios() {
    axios.get(`https://finprojectapi.herokuapp.com/api/v1/community/movies/?page=${pageNum}`)
      .then(res => {
        dispatch(addMovies(res.data))
        if (isLoading) {setIsLoading(false)}
      })
      .catch(err => console.log(err))
  }
  useEffect(myaxios,[pageNum])

  if (!isLoading) {
    setTimeout(() => {
      const bottomSensor = document.getElementById("bottomSensor")
      const watcher = scrollMonitor.create(bottomSensor)
      watcher.enterViewport(() => setTimeout(
        () => setPageNum(pageNum+1)
      ),500)
    },500)
  }

  return (
    <div className="container">
      {isLoading ? <div className="text-center my-5"><i className="fas fa-spinner"></i></div> :
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