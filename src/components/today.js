import React from 'react';
import './today.css'

import YearCard from './year-card';

export default class Today extends React.Component {
  render() {
    //the end of the day, last second
    const endOfToday = new Date(new Date().setHours(23,59,59,999));
    const startOfToday = new Date(new Date().setHours(0,0,0,0));
    console.log(`END OF TODAY ${endOfToday}`);
    console.log(`START OF TODAY ${startOfToday}`);
    //the outcomeInToday prop set to true simple marks the coutcomes 
    //generated in the Today component, as they will have different styling
    const todayOutcomes = this.props.outcomes
      .filter(outcome => outcome.date >= startOfToday && outcome.date <= endOfToday)
      .map((outcome, index) => {
        return <li><YearCard outcomeInfo={outcome} outcomeInToday={true} key={index} /></li>
      })

    return (
      <div className={"today-parent " + (this.props.range === 1 ? "time-highlight" : null) }>
        <h2 className="year-header">Today</h2>
        <div>
          <ol className="today-ul">
            {todayOutcomes}
          </ol>
        </div>
      </div>
  );

  }


} 


