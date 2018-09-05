import React from 'react';
import {connect} from 'react-redux';
import './board.css';
import OutcomeForm from './outcome-form';
import Years from './years';
import Year from './year';
import Month from './month';
import Week from './week';
import Today from './today';
import requiresLogin from './requires-login';
import {fetchBoard, screenWidth} from '../actions';
import HeaderBar from './header-bar';

export class Board extends React.Component {
  
componentDidMount() {
  this.props.dispatch(fetchBoard(this.props.userId));
}
  
  render() {
    //let timePeriod = document.getElementById('ya');
    //timePeriod.classList.add('highlight-time-period');
    
    //so render any all js works 
    //render executes when the component is loaded, at the beginning 
    //any method is called when it's explicitly called
    //the constructor is the first thing the class runs
    //the store state is redux, the single state of truth for the app
    //the local component state is just for the component
    
    window.onresize = () => {
        const widthInPX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //console.log(width1);
        this.props.dispatch(screenWidth(widthInPX))
    }

    //let selectedOutcomeElement = []
    /*
    if(this.state.event != null) {
      console.log(this.state.event)
      console.log(this.state.event.textContent);
      let children = this.state.event.childNodes;
      //console.log(`whatText is ${children[0].childNodes[1].textContent}`);
      let selectedWhatText = children[0].childNodes[1].textContent;
      console.log(selectedWhatText);    
    }*/
    //this was necessary becuase dates are coming out of the db looking
    //like this... date: "2018-08-07T23:28:29.582Z" and not like...
    //this... date: Tue Aug 07 2018 18:28:29 GMT-0500 (Colombia Standard Time)
    //and that was messing up date filtering in the components
    const propsWithStandardDate = this.props.outcomes.map(outcome => {
      return Object.assign({}, outcome, {date: new Date(outcome.date)})
    });
    
    //if range isn't set b/c user hasn't begun scrolling then set range to 1825 (i.e. the 5 year level)
    let range = this.props.range ? this.props.range : 1825;
    
    /*
    Basically I want to detect if range is X then activate Y style in 
    the corresponding component
    so like if range === 1825 then add className="background" the component
    */
    return (
        <div>
          {/*<div className="dashboard">
              <div className="dashboard-username">
                  Email: {this.props.email}
              </div>
              
            </div>*/}
          <header className="top-bar">
            <HeaderBar />
            <OutcomeForm selectedOutcome={this.props.selectedOutcome} range={range} userId={this.props.userId} />
            <nav>
              <ul className="time-nav">
                <li className={range === 1825 ? "highlight-time-period" : null}>5 Year</li>
                <li className={this.props.range === 365 ? "highlight-time-period" : null}>This Year</li>
                <li className={this.props.range === 30 ? "highlight-time-period" : null}>This Month</li>
                <li className={this.props.range === 7 ? "highlight-time-period" : null}>This Week</li>
                <li className={this.props.range === 1 ? "highlight-time-period" : null}>Today</li>
              </ul>
            </nav>
          </header>
          <Years range={range} width={this.props.width} outcomes={propsWithStandardDate} startDate={this.props.startDate} endDate={this.props.endDate} />
          <Year range={range} width={this.props.width} outcomes={propsWithStandardDate} />
          <Month range={range} width={this.props.width} outcomes={propsWithStandardDate} />
          <Week range={range} width={this.props.width} outcomes={propsWithStandardDate} />
          <Today range={range} width={this.props.width} outcomes={propsWithStandardDate} />
        </div>
      );  
    }
    
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  console.log(state.outcomes)
  console.log(state.data.outcome)
  return { 
    email: state.auth.currentUser.email,
    outcomes: state.data.outcomes || [],
    range: state.data.range,
    selectedOutcome: state.data.outcome,
    rangeCss: state.data.rangeCss,
    userId: state.auth.userId, 
    startDate: state.auth.startDate,
    endDate: state.auth.endDate,
    width: state.data.screenWidthStore 
  }
};

export default requiresLogin()(connect(mapStateToProps)(Board));
//export default connect(mapStateToProps)(Board);



/*
-There's the form/time period bar and there's a space (of the height I
can define) through which components will pass as the user scrolls down
-I need to define the bounds of that space, detect when a component (or
really it's rendered jsx) is in that space and...
  -change the background color
  -change background color of the 5 year, 1 year, etc <li>s
  -set the range variable
  -
*/


/*

var React = require("react");
var _ = require("underscore"); <-this is just functions and/or function helpers

//here dude makes a component and uses propTypes to do type checking
//propTypes do typechecking at the component level 
//so this below is just a type check saying that ScrollWrapper will
//receive a prop in this.props called onWindowScroll and that prop will
//have a type of function

var ScrollWrapper = React.createClass({
    propTypes: {
        onWindowScroll: React.PropTypes.func
    },

    handleScroll: function(event) {
        // Do something generic, if you have to
        console.log("ScrollWrapper's handleScroll");

        // Call the passed-in prop
        if (this.props.onWindowScroll) this.props.onWindowScroll(event);
    },

    render: function () {
        return this.props.children;
    },

    componentDidMount: function() {
        if (this.props.onWindowScroll) window.addEventListener("scroll", this.handleScroll);
    },

    componentWillUnmount: function() {
        if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll);
    }
});

var ComponentA = React.createClass({
    handleScroll: function(event) {
        console.log("ComponentA's handleScroll");
    },

    render: function() {
        return (
            <ScrollWrapper onWindowScroll={this.handleScroll}>
                <div>whatever</div>
            </ScrollWrapper>
        );
    }
});


<TimeRangeTracker />
*/