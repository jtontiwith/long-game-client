import * as actions from "../actions";

let futureDate1 = new Date(new Date().setDate(new Date().getDate() + 5)); 
let futureDate2 = new Date(new Date().setDate(new Date().getDate() + 175));
let futureDate3 = new Date(new Date().setDate(new Date().getDate() + 1300));
let futureDate4 = new Date(new Date().setDate(new Date().getDate() + 0));
let futureDate5 = new Date(new Date().setDate(new Date().getDate() + 25));
let futureDate6 = new Date(new Date().setDate(new Date().getDate() + 600));
let futureDate7 = new Date(new Date().setDate(new Date().getDate() + 0));


const initialState = {
  outcomes: [
    {
      id: 1,
      whatText: 'finish thinkful',
      whyText: 'so I can get a good job and create value for myself and others',
      date: futureDate1,
      range: 1825,
      editing: false,
      showDetail: false
    },
    {
      id: 2,
      whatText: 'pay off debt',
      whyText: 'so that I don\'t accrue more interest and feel tranquil about my finances', 
      date: futureDate2,
      range: 365,
      editing: false,
      showDetail: false
    },
    {
      id: 3,
      whatText: '3 months in New York!',
      whyText: 'to attend Recurse and spend 3 months in one of the world\'s great cities', 
      date: futureDate3,
      range: 1825,
      editing: false,
      showDetail: false 
    },
    {
      id: 4,
      whatText: 'Go Fishing on Sat morning',
      whyText: 'to eat some fish you catch', 
      date: futureDate4,
      range: 7,
      editing: false,
      showDetail: false 
    },
    {
      id: 5,
      whatText: 'Read 12 Rules for Life',
      whyText: 'read it brahh', 
      date: futureDate5,
      range: 30,
      editing: false,
      showDetail: false 
    },
    {
      id: 6,
      whatText: 'Build my own house',
      whyText: 'go build your own house fool', 
      date: futureDate6,
      range: 1825,
      editing: false,
      showDetail: false 
    },
    {
      id: 7,
      whatText: 'Pick up drycleaning',
      whyText: 'get your clothes', 
      date: futureDate7,
      range: 1,
      editing: false,
      showDetail: false 
    }
  ]
};

export const reducer = (state=initialState, action) => {
  if(action.type === actions.ADD_OUTCOME) {
    return Object.assign({}, state, {
      outcomes: [...state.outcomes, {
        id: 8,
        whatText: action.whatText,
        whyText: action.whyText,
        date: action.date,
        range: action.range,
        editing: false,
        showDetail: false 
        }]
    });
  }
  return state;
};