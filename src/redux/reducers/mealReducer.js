// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  SET_MEALS_ERROR_MESSAGE,
  SET_MEALS,
  REQUESTING_MEALS,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  requesting: false,
  error: '',
};

function mealReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_MEALS:
    return {
      ...state,
      meals: payload,
      requesting: false,
    };
  case SET_MEALS_ERROR_MESSAGE:
    return {
      ...state,
      error: payload,
      requesting: false,
    };
  case REQUESTING_MEALS:
    return {
      ...state,
      requesting: true,
    };
  default:
    return state;
  }
}

export default mealReducer;
