import React from 'react';
import './month.css';

import YearCard from './year-card';

export default class Month extends React.Component {
  render() {
    /* the calc for positioning */
    //5 year start
    const start = new Date();
    //one month end
    const monthEnd = new Date(new Date().setMonth(new Date().getMonth() + 1));
    //console.log(`star ${start} and monthedn ${monthEnd}`)
    // number of days in between 
    const oneMonthPeriod = Math.round(Math.abs((monthEnd - start) / 86400000));
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    //here we are filter out the outcomes that don't fall by the end of
    //the year
    const oneMonthOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < monthEnd && outcome.range >= 30)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - start) / 86400000));
        //console.log(`this is the unmodified date ${outcome.date}`);
        //console.log(`this is the start date ${start}`);
        //console.log(`this is the number of days until the outcome ${daysUntilOutcome}`);
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneMonthPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        const leftPositioning = Math.round(width * pixelFinderFractionX);
        //console.log(`this is how many pix it should be from the left ${leftPositioning}`);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} outcomeInfo={outcome} key={index} />
      });
      
      //console.log(`The outcome for the MONTH ${oneMonthOutcomes}`);

    return(
      <div className={"one-month-parent " + (this.props.range === 30 ? "time-highlight" : null) }>
        <h2 className="month-header">This Month</h2>
        <div>{oneMonthOutcomes}</div>
      </div>
    )

  }
}