export const PERSONAL = 'PERSONAL';
export const SCORE_PERSONAL = 'SCORE_PERSONAL';

export const personal = (personalInfo) => ({
  type: PERSONAL,
  payload: {
    personalInfo,
  },
});

export const scorePersonal = (scoreInfo) => ({
  type: SCORE_PERSONAL,
  payload: {
    scoreInfo,
  },
});
