import { PERSONAL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PERSONAL:
    return {
      ...state, user: { ...action.payload },
    };
  default:
    return state;
  }
};

export default user;
