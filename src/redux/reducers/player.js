import { SCORE_PERSONAL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const scorePersonal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_PERSONAL:
    return {
      ...state,
      score: state.score + action.payload.scoreInfo,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default scorePersonal;
