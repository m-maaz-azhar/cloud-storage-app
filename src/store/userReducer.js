import { UPDATE_USER_TYPE } from './actions/userActions.js';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_TYPE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;