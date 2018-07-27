import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';


//generating some future dates
let today = new Date();
let futureDate1 = new Date(today.setDate(today.getDate() + 75)); 
let futureDate2 = new Date(today.setDate(today.getDate() + 175));
let futureDate3 = new Date(today.setDate(today.getDate() + 475));


//making some fake future outcomes
const OUTCOMES = [
  {
    id: 1,
    whatText: 'finish thinkful',
    whyText: 'so I can get a good job and create value for myself and others',
    date: futureDate1,
    editing: false,
    showDetail: false
  },
  {
    id: 2,
    whatText: 'pay off debt',
    whyText: 'so that I don\'t accrue more interest and feel tranquil about my finances', 
    date: futureDate2,
    editing: false,
    showDetail: false
  },
  {
    id: 3,
    whatText: '3 months in New York!',
    whyText: 'to attend Recurse and spend 3 months in one of the world\'s great cities', 
    date: futureDate3,
    editing: false,
    showDetail: false
  }
]

//setting year ending dates for the next 5 years 
const DATES = [
  new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
  new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
  new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
  new Date(new Date().setFullYear(new Date().getFullYear() + 5))
]



ReactDOM.render(<Board dates={DATES} outcomes={OUTCOMES} />, document.getElementById('root'));

