import { CHANGE_FAVORITES } from '../actions';

const INITIAL_STATE = {
  handle: false,
};

function favoriteReducer(state = INITIAL_STATE, { type }) {
  switch (type) {
  case CHANGE_FAVORITES:
    return {
      ...state,
      handle: !state.handle,
    };
  default:
    return state;
  }
}

export default favoriteReducer;
