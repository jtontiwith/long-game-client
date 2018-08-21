import {normalizeResponseErrors} from './utils';
import {API_BASE_URL} from '../config';
console.log(API_BASE_URL);



export const ADD_OUTCOME = 'ADD_OUTCOME';
export const addOutcome = (whatText, whyText, date, range) => ({
  type: ADD_OUTCOME,
  whatText,
  whyText,
  date,
  range
});

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




/*

export const GET_RANGE = 'GET_RANGE';
export const getRange = (yRange) => {
  console.log(yRange)
  return {
    type: GET_RANGE,
    yRange
  };
} 


fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
*/

export const deleteOutcome = (selectedId) => dispatch => {
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
  }).then(res => dispatch(fetchBoard()));
};

//action to update an outcome
export const updateOutcome = (whatText, whyText, date, range, selectedId) => dispatch => {
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
  }).then(res => dispatch(fetchBoard()));
}; 

//action to post and outcome to the db
export const postOutcome = (whatText, whyText, date, range) => dispatch => {
  fetch(`${API_BASE_URL}/outcomes`, {
    method: 'POST',
    body: JSON.stringify({
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
    return res.json()
  }).then(res => dispatch(fetchBoard()));
}; 

export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const fetchBoardSuccess = outcomes => ({
    type: FETCH_BOARD_SUCCESS,
    outcomes
    
});

export const fetchBoard = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(localStorage)
  return fetch(`${API_BASE_URL}/outcomes`, {
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


/*
old working version

export const fetchBoard = () => dispatch => {
  fetch(`${API_BASE_URL}/outcomes`).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    console.log(res);
    return res.json(); //here I specify the format of the response
  }).then(outcomes => {
    console.log(outcomes.outcomesModels);
    dispatch(fetchBoardSuccess(outcomes.outcomesModels));
  });
};




*/
