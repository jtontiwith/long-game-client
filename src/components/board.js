import React from 'react';
import {connect} from 'react-redux';

import './board.css';
import OutcomeForm from './outcome-form';
import TimeRangeTracker from './time-range-tracker';
//import Timelines from './timelines';  <Timelines outcomes={this.props.outcomes} />
import Years from './years';
import Year from './year';
import Month from './month';
import Week from './week';
import Today from './today';

import {fetchBoard, postOutcome, updateOutcome, deleteOutcome} from '../actions';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    }
    //this.updateCounter = this.updateCounter.bind(this);
  }  
  
  outcomeGrabber = (e) => {
    this.setState({
      event: e.currentTarget
    })
    console.log(this.state.event); //why is this null
    //this.some();
  }

  addOutcomeToDB(whatText, whyText, outcomeDate, range) {
    this.props.dispatch(postOutcome(whatText, whyText, outcomeDate, range))
  }

  updateOutcomeToDB(whatText, whyText, outcomeDate, range, selectedId) {
    this.props.dispatch(updateOutcome(whatText, whyText, outcomeDate, range, selectedId))
    console.log(selectedId);
  }

  deleteOutcomeFromDB(selectedId) {
    this.props.dispatch(deleteOutcome(selectedId))
    console.log(selectedId);
  }


  componentDidMount() {
    this.props.dispatch(fetchBoard());
  }
  
  render() {
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
    
    return (
        <div>
          {console.log(this.state.event)}
          {console.log(this.selectedWhatText)}
        
        
        <OutcomeForm selectedOutcome={this.state.event} 
        onAdd={(whatText, whyText, outcomeDate, range) => this.addOutcomeToDB(whatText, whyText, outcomeDate, range)} 
        onUpdate={(whatText, whyText, outcomeDate, range, selectedId) => this.updateOutcomeToDB(whatText, whyText, outcomeDate, range, selectedId)}
        onDelete={(selectedId) => this.deleteOutcomeFromDB(selectedId)}
        />
        <TimeRangeTracker />
        <Years outcomeGrabber={this.outcomeGrabber} outcomes={propsWithStandardDate} />
        <Year outcomes={propsWithStandardDate} />
        <Month outcomes={propsWithStandardDate} />
        <Week outcomes={propsWithStandardDate} />
        <Today outcomes={propsWithStandardDate} />
        </div>
      );  
    }
    
}

const mapStateToProps = state => {
  return {
  outcomes: state.outcomes || []
  }
};

export default connect(mapStateToProps)(Board);



/*
I want to render a component no matter what
if a certain prop exists I want to render it with that prop
if the prop doesn't exist I still want it to render


*/