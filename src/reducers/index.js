// src/reducers/index.js

import { combineReducers } from 'redux';
import cartReducer from './lang-reducer';

const allReducers = {
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;