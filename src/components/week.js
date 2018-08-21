import React from 'react';
import './week.css';

import YearCard from './year-card';

export default class Week extends React.Component {
  render() {
    /* the calc for positioning */
    //5 year start
    const start = new Date();
    //one week end
    const weekEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate()+7);
    //console.log(`star ${start} and monthedn ${weekEnd}`)
    // number of days in between 
    const oneWeekPeriod = Math.floor((weekEnd - start) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    //here we are filter out the outcomes that don't fall by the end of
    //the week
    const oneWeekOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < weekEnd && outcome.range >= 7)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.abs((outcome.date - start) / 86400000);
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneWeekPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        const leftPositioning = Math.round(width * pixelFinderFractionX);
        //console.log(leftPositioning);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} outcomeInfo={outcome} key={index} />
      });

      //console.log(oneWeekOutcomes);

    return(
      <div className={"one-week-parent " + (this.props.range === 7 ? "time-highlight" : null) }>
        <h2 className="week-header">This Week</h2>
        <div>{oneWeekOutcomes}</div>
      </div>

    )

  }
}