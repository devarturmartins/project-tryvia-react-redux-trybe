export const PERSONAL = 'PERSONAL';

export const personal = (personalInfo) => ({
  type: PERSONAL,
  payload: {
    personalInfo,
  },
});
