import React from 'react';
import { connect } from 'react-redux';
import './today.css'
import YearCard from './year-card';
import { getRange } from '../actions';

export class Today extends React.Component {
  constructor(props) {
    super(props);
    this.myOneDayParentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("load", function(event) {
      let refedOneDayParendDiv = document.querySelector("#today-parent");
      createObserver(refedOneDayParendDiv);
    }, false);
  
    function createObserver(refedOneDayParendDiv) {
      let observer;
    
      var options = {
        root: null,
        //rootMargin: "0px",
        threshold: .9
      };
    
      observer = new IntersectionObserver(callback, options);
      observer.observe(refedOneDayParendDiv);
    }
    
    var callback = (entries, observer) => { 
      entries.forEach(entry => {
        if(entry.intersectionRatio > .8) {
          console.log('1 month component in view here!')
          const range = 1;
          this.props.dispatch(getRange(range));
        }
        
        
      });
    }; 


  }
  
  
  render() {
    //the end of the day, last second
    const endOfToday = new Date(new Date().setHours(23,59,59,999));
    const startOfToday = new Date(new Date().setHours(0,0,0,0));
    //the outcomeInToday prop set to true simple marks the coutcomes 
    //generated in the Today component, as they will have different styling
    const todayOutcomes = this.props.outcomes
      .filter(outcome => outcome.date >= startOfToday && outcome.date <= endOfToday)
      .map((outcome, index) => {
        return <li><YearCard outcomeInfo={outcome} outcomeInToday={true} key={index} /></li>
      })

    return (
      <div ref={this.myOneDayParentRef} id="today-parent" className={"today-parent " /*+ (this.props.range === 1 ? "time-highlight" : null)*/ }>
        <div>
          <ol className="today-ol">
            {todayOutcomes}
          </ol>
        </div>
      </div>
  );

  }


} 

export default connect()(Today);

