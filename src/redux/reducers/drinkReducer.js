// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  SET_DRINKS_ERROR_MESSAGE,
  SET_DRINKS,
  REQUESTING_DRINKS,
} from '../actions';

const INITIAL_STATE = {
  drinks: [],
  requesting: false,
  error: '',
};

function drinkReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_DRINKS:
    return {
      ...state,
      drinks: payload,
      error: '',
      requesting: false,
    };
  case SET_DRINKS_ERROR_MESSAGE:
    return {
      ...state,
      error: payload,
      requesting: false,
    };
  case REQUESTING_DRINKS:
    return {
      ...state,
      requesting: true,
    };
  default:
    return state;
  }
}

export default drinkReducer;
