import React from 'react';
import './year.css';
import YearCard from './year-card';

export default class Year extends React.Component {

  render() {
    /*
    let yearOutcomes = this.props.outcomes.filter(outcome => {
      console.log(this.props.yearEnd);
      return outcome.date < this.props.yearEnd
    });
    */
    console.log(this.props.yearEnd);
  
    return (
      <div>
      <time>{this.props.yearEnd.toLocaleDateString('en-US')}</time>
      <YearCard outcomes={this.props.outcomes} />
      </div>
    );  
  }
}