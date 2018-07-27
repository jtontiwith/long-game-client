import React from 'react';
import './board.css';
import OutcomeForm from './outcome-form';
import TimeRangeTracker from './time-range-tracker';
import Timelines from './timelines';

export default class Board extends React.Component {
  render() {
    console.log(this.props.dates)
    return (
        <div>
        <OutcomeForm />
        <TimeRangeTracker />
        <Timelines dates={this.props.dates} outcomes={this.props.outcomes} />
        
        </div>
      );  
    }
    
}