import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

export const addMovies = createAction("ADD")
const reducer = createReducer([],{
  [addMovies]: (state,action) => {
    return [...state,...action.payload]
  }
})

const store = configureStore({reducer})


export default store