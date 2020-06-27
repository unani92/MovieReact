import { createAction, createReducer, createStore, combineReducers } from "@reduxjs/toolkit";

export const addMovies = createAction("ADD")
export const searchMovies = createAction("SEARCH")

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

const reducer = combineReducers({
  homeReducer,
  searchReducer
})

const store = createStore(reducer)


export default store