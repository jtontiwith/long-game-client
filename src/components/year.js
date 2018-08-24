import React from 'react';
import './year.css';
import YearCard from './year-card';


export default class Year extends React.Component {
 
  render() {
    /* the calc for positioning */
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)
    // number of days in between 
    const currentYearPeriod = Math.floor((lastDayOfYear - firstDayOfYear) / 86400000)
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //here we are filter out the outcomes for the year
    const oneYearOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < lastDayOfYear && outcome.range >= 365)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - firstDayOfYear) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/currentYearPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        const leftPositioning = Math.round(width * pixelFinderFractionX);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} key={index} />
    });

    let startAndEndDates;
    if(this.props.range === 365) {
      startAndEndDates = <div>
        <span className="dates start-date">{firstDayOfYear.toDateString().slice(3)}</span>
        <span className="dates end-date">{lastDayOfYear.toDateString().slice(3)}</span>    
        </div>
    } 

    return (
      <div className={"one-year-parent " + (this.props.range === 365 ? "time-highlight" : null) }>
        {startAndEndDates}
        <h2 className="year-header">This Year</h2>
        <div>{oneYearOutcomes}</div>
      </div>
    )

  }

}

/*
-the year will always be fixed in that the Year component will show a 
12 month period fixed in time, it will not show a moving 12 month 
period that updates monthly
-thus upon creating a 5 year plan the user will see the year section
as the next 12 months from that day forward, and the year section will
only renew at the end of that 12 months instead of moving snapshot of 
month-over-month
-

*/


 /*
  Why doesn't this work?

    const oneYearOutcomes = [];
    for(let i = 0; i < this.props.outcomes; i++) {
      if(this.props.outcomes[i].date < yearEnd) {
        oneYearOutcomes.push(<YearCard outcomeInfo={this.props.outcomes[i]} key={i} />) 
      }
    }

    console.log(oneYearOutcomes);
    */