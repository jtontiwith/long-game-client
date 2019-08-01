import React from 'react';
import { connect } from 'react-redux';
import './month.css';
import YearCard from './year-card';
import { getRange } from '../actions';



export class Month extends React.Component {
  constructor(props) {
    super(props);
    this.myOneMonthParentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("load", function(event) {
      let refedOneMonthParendDiv = document.querySelector("#one-month-parent");
      createObserver(refedOneMonthParendDiv);
    }, false);
  
    function createObserver(refedOneMonthParendDiv) {
      let observer;
    
      var options = {
        root: null,
        //rootMargin: "0px",
        threshold: .9
      };
    
      observer = new IntersectionObserver(callback, options);
      observer.observe(refedOneMonthParendDiv);
    }
    
    var callback = (entries, observer) => { 
      entries.forEach(entry => {
        if(entry.intersectionRatio > .8) {
          console.log('1 month component in view here!')
          const range = 30;
          this.props.dispatch(getRange(range));
        }
        
        
      });
    }; 


  }
  
  
  render() {
    /* the calc for positioning */
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    // number of days in between 
    const oneMonthPeriod = Math.round(Math.abs((lastDayOfMonth - firstDayOfMonth) / 86400000));
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //here we filter out the outcomes that don't fall by the end of
    //the month
    const oneMonthOutcomes = this.props.outcomes
      .filter(outcome => outcome.date <= lastDayOfMonth && outcome.date >= firstDayOfMonth && outcome.range >= 30)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - firstDayOfMonth) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneMonthPeriod;
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
      /*if(this.props.range === 30) {
        startAndEndDates = <div>
          <span className="dates start-date">{firstDayOfMonth.toDateString().slice(3)}</span>
          <span className="dates end-date">{lastDayOfMonth.toDateString().slice(3)}</span>    
          </div>
      }*/  
      
    return(
      <div ref={this.myOneMonthParentRef} id="one-month-parent" className={"one-month-parent " + (this.props.range === 30 ? "time-highlight" : null) }>
        {startAndEndDates}   
        <div>{oneMonthOutcomes}</div>
      </div>
    )

  }
}

export default connect()(Month)