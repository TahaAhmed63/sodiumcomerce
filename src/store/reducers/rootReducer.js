// rootReducer.js
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import productReducer from './../slice/productslice';
import pageReducer from "./../slice/allpageslice"
import cartslice from '../slice/cartslice';
import gravityFormSlice from "../slice/gravityformslice"
const rootReducer = combineReducers({
  // menu: menuReducer,
  // page: pageReducer,
  products:productReducer,
  cart:cartslice,
  forms:gravityFormSlice
  // Add other reducers here
});

export default rootReducer;
