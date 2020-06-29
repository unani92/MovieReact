import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import styled from "styled-components";
import axios from 'axios'
import scrollMonitor from 'scrollmonitor'
import { tvOnAir, tvPopular } from "../store";
import Tv from "../components/Tv"

const Container = styled.div
`
  margin-top:50px;
`
const BtnTab = styled.div
`
  padding-left: 1rem;
  font-weight: bold;
  color: white;
`

function TvHome({ onAir, popular, dispatch }) {
  let [tabState,setTabState] = useState("onAir")
  let[tabData, setTabdata] = useState([])
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

  function handleClick(event) {
    const onAirBtn = document.querySelector("#onAirBtn")
    const popularBtn = document.querySelector("#popularBtn")
    if (tabState === "onAir") {
      setTabState("popular")
      setTabdata([...popular])
      popularBtn.setAttribute("disabled",true)
      onAirBtn.removeAttribute("disabled")
    } else {
      setTabState("onAir")
      setTabdata([...onAir])
      onAirBtn.setAttribute("disabled",true)
      popularBtn.removeAttribute("disabled")
    }
  }

  function getOnAir() {
    axios.get(`https://api.themoviedb.org/3/tv/on_the_air?page=${onAirPageNum}`, option)
      .then(res => {
        const { data:{results} } = res
        dispatch(tvOnAir(results))
        setTabdata([...onAir])
        if (onAirLoading) {setOnAirLoading(false)}
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  function getPopular() {
    axios.get(`https://api.themoviedb.org/3/tv/popular?page=${popularPageNum}`, option)
      .then(res => {
        const { data:{results} } = res
        dispatch(tvPopular(results))
        setTabdata([...popular])
        if (popularLoading) {setPopularLoding(false)}
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  useEffect(getOnAir,[onAirPageNum])
  useEffect(getPopular,[popularPageNum])

  if (!onAirLoading && !popularLoading) {
    setTimeout(() => {
      const bottomSensor = document.getElementById("bottomSensor")
      const watcher = scrollMonitor.create(bottomSensor)
      if (tabState === "onAir") {
        watcher.enterViewport(() => setTimeout(
          () => setOnAirPageNum(onAirPageNum+1)
        ),500)} else {
        watcher.enterViewport(() => setTimeout(
          () => setPopularPageNum(popularPageNum+1)
        ),500)}
    },500)
  }

  return (
    <Container className="container">
      <BtnTab>
        <button onClick={handleClick} id="onAirBtn" className="btn btn-warning font-weight-bold text-white mr-3">On Air</button>
        <button onClick={handleClick} id="popularBtn" className="btn btn-warning font-weight-bold text-white">Popular</button>
      </BtnTab>
      {!onAirLoading && !popularLoading ?
        (<div className="row">
          {tabData.map((tv,index) => (
            <div key={index} className="col-4">
              <Tv key={index} id={tv.id} poster_path={tv.poster_path} title={tv.name}/>
            </div>
          ))}
          <div id="bottomSensor"></div>
        </div>) : "loading"
      }
    </Container>
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