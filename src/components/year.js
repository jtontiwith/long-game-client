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
      .filter(outcome => outcome.date <= lastDayOfYear && outcome.date >= firstDayOfYear && outcome.range >= 365)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - firstDayOfYear) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/currentYearPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        let leftPositioning = Math.round(width * pixelFinderFractionX);
        //hack/fix to ensure outcomes at the end of periods don't run off screen
        if(leftPositioning >= (width - 50)) {
          leftPositioning = width - 80;
        }
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
    );
  }
}