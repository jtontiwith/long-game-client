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
    return (
        <div>
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