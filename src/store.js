import { createAction, createReducer, createStore, combineReducers, configureStore } from "@reduxjs/toolkit";

export const addMovies = createAction("ADD")
export const searchMovies = createAction("SEARCH")
export const detailMovies = createAction("DETAIL")
export const recommendMovies = createAction("RECOMMEND")
export const youtubeMovies = createAction("YOUTUBE")
export const tvOnAir = createAction("ONAIR")
export const tvPopular = createAction("TVPOPULAR")

const homeReducer = createReducer([],{
  [addMovies]: (state,action) => {
    return [...state,...action.payload]
  }
})
const searchReducer = createReducer([], {
  [searchMovies]: (state,action) => {
    return [...action.payload]
  }
})
const detailReducer = createReducer([], {
  [detailMovies]: (state,action) => {
    return action.payload
  }
})
const recommendReducer = createReducer([], {
  [recommendMovies]: (state,action) => {
    return [...action.payload]
  }
})
const youtubeReducer = createReducer([], {
  [youtubeMovies]: (state,action) => {
    return action.payload
  }
})
const tvOnAirReducer = createReducer([],{
  [tvOnAir]: (state,action) => {
    return [...state, ...action.payload]
  }
})
const tvPopularReducer = createReducer([],{
  [tvPopular]: (state,action) => {
    return [...state, ...action.payload]
  }
})

const reducer = combineReducers({
  homeReducer,
  searchReducer,
  detailReducer,
  recommendReducer,
  youtubeReducer,
  tvOnAirReducer,
  tvPopularReducer,
})

const store = configureStore({ reducer })


export default store