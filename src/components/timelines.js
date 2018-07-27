import React from 'react';
import './timelines.css'
import Years from './years';

export default class Timelines extends React.Component {
  render() {
    /*
    const arr = [];
    this.props.outcomes.forEach(outcome => {
      arr.push(outcome.whatText)
    })*/
    return (
     <div>
      <Years dates={this.props.dates} outcomes={this.props.outcomes} />
     </div>
    );  
  }
}

/*
Inside the Timeline Component there will always be only 1 Years Component
and inside the Years Component there will always be 5 Year Components and 
inside the Year Component there could be any number of Year Card Components



*/