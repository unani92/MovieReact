import { createAction, createReducer, createStore, combineReducers } from "@reduxjs/toolkit";

export const addMovies = createAction("ADD")
export const searchMovies = createAction("SEARCH")
export const detailMovies = createAction("DETAIL")
export const recommendMovies = createAction("RECOMMEND")
export const youtubeMovies = createAction("YOUTUBE")

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

const reducer = combineReducers({
  homeReducer,
  searchReducer,
  detailReducer,
  recommendReducer,
  youtubeReducer
})

const store = createStore(reducer)


export default store