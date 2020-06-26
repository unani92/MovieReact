import { createAction, createReducer, createStore } from "@reduxjs/toolkit";

export const addMovies = createAction("ADD")
export const searchMovies = createAction("SEARCH")
const reducer = createReducer([],{
  [addMovies]: (state,action) => {
    return [...state,...action.payload]
  },
  [searchMovies]: (state,action) => {
    return [...action.payload]
  }
})

const store = createStore(reducer)


export default store