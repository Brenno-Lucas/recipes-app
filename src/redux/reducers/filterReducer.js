import { SET_TYPE } from '../actions';

const INITIAL_STATE = {
  type: 'all',
};

function filterReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_TYPE:
    return {
      ...state,
      type: payload,
    };
  default:
    return state;
  }
}

export default filterReducer;
