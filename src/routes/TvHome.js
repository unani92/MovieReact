import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { tvOnAir, tvPopular } from "../store";
import Tv from "../components/Tv"
import axios from 'axios'
import scrollMonitor from 'scrollmonitor'

function TvHome({ onAir, dispatch }) {
  const [tabState,setTabState] = useState("onAir")
  const [onAirLoading,setOnAirLoading] = useState(true)
  const [popularLoading, setPopularLoding] = useState(true)
  const [onAirPageNum, setOnAirPageNum] = useState(1)
  const [popularPageNum, setPopularPageNum] = useState(1)
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const option = {
    params: {
      api_key: TMDB_API_KEY,
      language: "ko-KR",
    }
  }
  function getOnAir() {
    axios.get(`https://api.themoviedb.org/3/tv/on_the_air?page=${onAirPageNum}`, option)
      .then(res => {
        const { data:{results} } = res
        dispatch(tvOnAir(results))
        if (onAirLoading) {setOnAirLoading(false)}
      })
      .catch(err => console.log(err))
  }
  useEffect(getOnAir,[onAirPageNum])

  if (!onAirLoading) {
    setTimeout(() => {
      const bottomSensor = document.getElementById("bottomSensor")
      const watcher = scrollMonitor.create(bottomSensor)
      watcher.enterViewport(() => setTimeout(
        () => setOnAirPageNum(onAirPageNum+1)
      ),500)
    },500)
  }

  return (
    <div className="container">
      {onAirLoading ? <div className="text-center my-5"><i className="fas fa-spinner"></i></div> :
        (<div className="row">
          {onAir.map((tv,index) => (
            <div key={index} className="col-4">
              <Tv key={index} id={tv.id} poster_path={tv.poster_path} title={tv.name}/>
            </div>
          ))}
          <div id="bottomSensor"></div>
        </div>)
      }
    </div>
  )
}
function mapStateToProps(state) {
  const {   tvOnAirReducer, tvPopularReducer, } = state
  return { onAir: tvOnAirReducer, popular: tvPopularReducer }
}
function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps) (TvHome)