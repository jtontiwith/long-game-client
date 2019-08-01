import React from 'react';
import { connect } from 'react-redux';
import './week.css';
import YearCard from './year-card';
import { getRange } from '../actions';

export class Week extends React.Component {
  constructor(props) {
    super(props);
    this.myOneWeekParentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("load", function(event) {
      let refedOneWeekParentDiv = document.querySelector("#one-week-parent");
      createObserver(refedOneWeekParentDiv);
    }, false);
  
    function createObserver(refedOneWeekParentDiv) {
      let observer;
    
      var options = {
        root: null,
        //rootMargin: "0px",
        threshold: .9
      };
    
      observer = new IntersectionObserver(callback, options);
      observer.observe(refedOneWeekParentDiv);
    }
    
    var callback = (entries, observer) => { 
      entries.forEach(entry => {
        if(entry.intersectionRatio > .8) {
          console.log('1 month component in view here!')
          const range = 7;
          this.props.dispatch(getRange(range));
        }
        
        
      });
    }; 


  }
  
  
  
  render() {
    /* the calc for week begin and end */
    const first = ((new Date().getDate() - new Date().getDay()) + 1) //get the day of the month (in a num), subtract the day of the week (again in a num), and add one so that's it now a Sunday
    const last = first + 6; // last day is the first day + 6
    const firstDayOfWeek = new Date(new Date().setDate(first));
    firstDayOfWeek.setHours(0,0,0,0);
    const lastDayOfWeek = new Date(new Date().setDate(last));
    lastDayOfWeek.setHours(0,0,0,0);

    //grabbing out outcomes for this week
    const oneWeekOutcomes = this.props.outcomes.filter(outcome => outcome.date <= lastDayOfWeek && outcome.date >= firstDayOfWeek && outcome.range >= 7);
    
    //initializing days of the week arrays
    let monday = [], tuesday = [], wednesday = [], thursday = [], friday = [], saturday = [], sunday = [];

    oneWeekOutcomes.forEach((outcome, index) => {
      if(outcome.date.getDay() == 1) {
        monday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true}/>)
      } else if (outcome.date.getDay() == 2) {
        tuesday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      } else if (outcome.date.getDay() == 3) {
        wednesday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      } else if (outcome.date.getDay() == 4) {
        thursday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      } else if (outcome.date.getDay() == 5) {
        friday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      } else if (outcome.date.getDay() == 6) {
        saturday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      } else if (outcome.date.getDay() == 0) {
        sunday.push(<YearCard outcomeInfo={outcome} key={index} outcomeInWeek={true} />)
      }
    });

      //creating dates to show on the board
      let startAndEndDates;
      /*if(this.props.range === 7) {
        startAndEndDates = <div>
          <span className="dates start-date">{firstDayOfWeek.toDateString().slice(3)}</span>
          <span className="dates end-date">{lastDayOfWeek.toDateString().slice(3)}</span>    
          </div>
      }*/  

      return(
        <div ref={this.myOneWeekParentRef} id="one-week-parent" className={"one-week-parent " + (this.props.range === 7 ? "time-highlight" : null) }>
          <div class="day-wrapper">
            <div>monday</div> 
            <section className="day">
              {monday}
            </section>
          </div>
          <div class="day-wrapper">
            <div>tuesday</div>
            <section className="day">
              {tuesday}
            </section>
          </div>
          <div class="day-wrapper">
          <div>wednesday</div>
            <section className="day">
              {wednesday}
            </section>
          </div>
          <div class="day-wrapper">
            <div>thursday</div>
            <section className="day">
              {thursday}  
            </section>
          </div>
          <div class="day-wrapper">
            <div>friday</div>
            <section className="day">
              {friday}
            </section>
          </div>
          <div class="day-wrapper">
            <div>saturday</div>
            <section className="day">
              {saturday}
            </section>
          </div>
          <div class="day-wrapper">
            <div>sunday</div>
            <section className="day">
              {sunday}
            </section>
          </div>
        </div>
      );

  }
}

export default connect()(Week);