import React from 'react';
import './year.css';
import YearCard from './year-card';


export default class Year extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      styles: {}
    }
  }
  
  //
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll(event) {
    //console.log('the scroll things', event)
    //console.log(`YEAR SCROLL: ${window.scrollY}`);
    /*
    if(window.scrollY >= 101 && window.scrollY <= 199) {
      //console.log(`still inside 5 year`);
      this.setState({
        styles: {
          background: '#f9f4f4'
        },
      })
    } else {
      this.setState({
        styles: {
          background: '#ffffff'
        }
      })
    }
  };*/

  render() {
    /* the calc for positioning */
    //5 year start
    const start = new Date();
    //1 year end
    const end = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    // number of days in between 
    const oneYearPeriod = Math.floor((end - start) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


    //here we are setting a pho year-end date
    let yearEnd = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    //console.log(this.props.outcomes[0].date);
    //here we are filter out the outcomes that don't fall by the end of
    //the year
    const oneYearOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < yearEnd && outcome.range >= 365)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        let freshDate = new Date(outcome.date);
        const daysUntilOutcome = Math.round(Math.abs((freshDate - start) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneYearPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        const leftPositioning = Math.round(width * pixelFinderFractionX);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} key={index} />
    });

    return (
      <div className={"one-year-parent " + (this.props.range === 365 ? "time-highlight" : null) }>
        <h2 className="one-year-header">This Year</h2>
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