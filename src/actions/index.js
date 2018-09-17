import {normalizeResponseErrors} from './utils';
import {API_BASE_URL} from '../config';
console.log(API_BASE_URL);

//add an outcome to the board action
export const ADD_OUTCOME = 'ADD_OUTCOME';
export const addOutcome = (whatText, whyText, date, range, userId) => ({
  type: ADD_OUTCOME,
  whatText,
  whyText,
  date,
  range,
  userId
});

//action to user is and set in montion visual cues
export const GET_RANGE = 'GET_RANGE';
export const getRange = (yRange, rangeCss) => {
  console.log(`YS ACTIONS ${yRange}`)
  return {
    type: GET_RANGE,
    yRange: yRange,
    rangeCss: rangeCss
  };
} 

//here we are just grabbing a single outcome from the DOM (not DB) so
//that we can populate the OutcomeForm with it's values and then update
//it, the logic of parsing the element is in the OutcomeForm itself
export const GET_OUTCOME = 'GET_OUTCOME';
export const getOutcome = (outcome) => {
  console.log('Here is your outcome:' + outcome)
  return {
    type: GET_OUTCOME,
    outcome
  }
}

//clearing an outcome 
export const CLEAR_OUTCOME = 'CLEAR_OUTCOME';
export const clearOutcome = () => {
  console.log('We are clearing an outcome!')
  return {
    type: CLEAR_OUTCOME
  }
}

//getting screen width for the calc to place outcomes
export const SCREEN_WIDTH = 'SCREEN_WIDTH';
export const screenWidth = (screenWidth) => {
  console.log(screenWidth);
  return {
    type: SCREEN_WIDTH,
    screenWidth
  }
}

//deleting an outcome
export const deleteOutcome = (selectedId, userId) => dispatch => {
  console.log('THIS THING RUNNING?')
  fetch(`${API_BASE_URL}/outcomes/${selectedId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }  
  }).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    //return res.json();
  }).then(res => dispatch(fetchBoard(userId)));
};

//action to update an outcome
export const updateOutcome = (whatText, whyText, date, range, selectedId, userId) => dispatch => {
  console.log(selectedId);
  fetch(`${API_BASE_URL}/outcomes/${selectedId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: selectedId, 
      whatText: whatText,
      whyText: whyText, 
      date: date,
      range: range,
      user_id: '123456'
    }),
    headers: {
      'Content-Type': 'application/json'
    }  
  }).then(res => {
    if(!res.ok) {
      console.log(`the whatText ${whatText} and ${whyText}`)
      return Promise.reject(res.statusText);
    }
    console.log(res)
    //return res //.json()
  }).then(res => dispatch(fetchBoard(userId)));
}; 

//action to post an outcome to the db
export const postOutcome = (whatText, whyText, date, range, userId) => dispatch => {
  fetch(`${API_BASE_URL}/outcomes`, {
    method: 'POST',
    body: JSON.stringify({
      whatText: whatText,
      whyText: whyText, 
      date: date,
      range: range,
      user_id: userId 
    }),
    headers: {
      'Content-Type': 'application/json'
    }  
  }).then(res => {
    if(!res.ok) {
      console.log(`the whatText ${whatText} and ${whyText}`)
      return Promise.reject(res.statusText);
    }
    console.log(res)
    return res.json()
  }).then(res => dispatch(fetchBoard(userId)));
}; 

export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const fetchBoardSuccess = outcomes => ({
    type: FETCH_BOARD_SUCCESS,
    outcomes
    
});


//this a function calling a function, and the inner function I am 
//receiving dispatch so I need to pass it in so I can use it later
//the pattern is better to pass the user_id form the component
//to process data do that in the component, to change the state,
//that should be in the reducer, and in the action it just making 
//the request
export const fetchBoard = (userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(userId)
  return fetch(`${API_BASE_URL}/outcomes/${userId}`, {
    method: 'GET',
    headers: {
      //send the auth token over the wire
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json()) //here I specify the format of the response
    .then(outcomes => {
      console.log(outcomes.outcomesModels);
      dispatch(fetchBoardSuccess(outcomes.outcomesModels));
    });
};


