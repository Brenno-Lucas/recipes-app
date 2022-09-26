import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import drinkReducer from './drinkReducer';

const rootReducer = combineReducers({ mealReducer, drinkReducer });

export default rootReducer;
