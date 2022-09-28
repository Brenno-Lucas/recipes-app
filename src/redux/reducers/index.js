import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import drinkReducer from './drinkReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({ mealReducer, drinkReducer, filterReducer });

export default rootReducer;
