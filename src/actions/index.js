export const ADD_OUTCOME = 'ADD_OUTCOME';
export const addOutcome = (whatText, whyText, date, range) => ({
  type: ADD_OUTCOME,
  whatText,
  whyText,
  date,
  range
});

console.log(addOutcome);