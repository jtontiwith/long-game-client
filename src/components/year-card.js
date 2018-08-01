import React from 'react';
import './year-card.css';

export default class YearCard extends React.Component {
  
  render() {
    console.log(this.props)
    
    console.log(`${this.props.leftp} biiotch`)
    
    

    let styles = {
      position: 'absolute',
      //top: this.props.outcomeInfo.top,
      top: this.props.topp,
      left: this.props.leftp
      //left: this.props.outcomeInfo.left 
    }

    return (
      <article style={styles} className="outcome">
        {this.props.outcomeInfo.whatText}
      </article> 
    );  
  }
}
