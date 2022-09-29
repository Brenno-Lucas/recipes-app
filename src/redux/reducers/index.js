import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import drinkReducer from './drinkReducer';
import filterReducer from './filterReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
  mealReducer,
  drinkReducer,
  filterReducer,
  favoriteReducer,
});

export default rootReducer;
