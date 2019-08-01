import React from 'react';
import {connect} from 'react-redux';
import './board.css';
import OutcomeForm from './outcome-form';
import OutcomeButton from './outcome-button';
import Years from './years';
import Year from './year';
import Month from './month';
import Week from './week';
import Today from './today';
import requiresLogin from './requires-login';
import {fetchBoard, screenWidth, showForm} from '../actions';
import ScrollControl from './scroll-control';
import { clearOutcome } from "../actions";

export class Board extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      editing: false
    }
  }

  setEditing = (editing, e) => {
    e.preventDefault();
    this.setState({ editing });
    //dispatch an action to clear the selectedOutcome
    this.props.dispatch(clearOutcome());
  }

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
    
    //grabbing the window size to correctly display outcomes
    window.onresize = () => {
        const widthInPX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.props.dispatch(screenWidth(widthInPX))
    }

    //standdardizing date format
    const propsWithStandardDate = this.props.outcomes.map(outcome => {
      return Object.assign({}, outcome, {date: new Date(outcome.date)})
    });

    //if range isn't set b/c user hasn't begun scrolling then set range to 1825 (i.e. the 5 year level)
    let range = this.props.range ? this.props.range : 1825;
    //let rangeNum;
    /*if(range == 1825) {
      rangeNum = 'Next 5 Years';
    } else if(range == 365) {
      rangeNum = 'This Year';
    } else if(range == 30) {
      rangeNum = 'This Month';  
    } else if(range == 7) {
      rangeNum = 'This Week';
    } else if(range == 1) {
      rangeNum = 'Today';
    }*/
    
    return (
        <div>
          <div className={this.props.showForm ? 'overlay' : null}></div>
          <header className="top-bar">
            <nav className="main-nav">
              <ScrollControl range={range} height={this.props.height} />
            </nav>
          </header>
          <Years width={this.props.width} outcomes={propsWithStandardDate} startDate={this.props.startDate} endDate={this.props.endDate} />
          <Year width={this.props.width} outcomes={propsWithStandardDate} />
          <OutcomeForm selectedOutcome={this.props.selectedOutcome} range={range} userId={this.props.userId} editing={this.state.editing} setEditing={this.setEditing} />
          <Month width={this.props.width} outcomes={propsWithStandardDate} />
          <Week outcomes={propsWithStandardDate} />
          <Today outcomes={propsWithStandardDate} />
          <OutcomeButton setEditing={this.setEditing} />
        </div>
      );  
    }
    
}

const mapStateToProps = state => {
  return { 
    email: state.auth.currentUser.email,
    outcomes: state.data.outcomes || [],
    range: state.data.range,
    selectedOutcome: state.data.outcome,
    rangeCss: state.data.rangeCss,
    userId: state.auth.userId, 
    startDate: state.auth.startDate,
    endDate: state.auth.endDate,
    width: state.data.screenWidthStore, 
    height: state.data.height,
    showForm: state.data.showForm
  }
};

export default requiresLogin()(connect(mapStateToProps)(Board));