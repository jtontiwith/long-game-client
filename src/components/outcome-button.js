import React from 'react';
import { connect } from 'react-redux';
import { showForm } from '../actions';
import './outcome-button.css';

const OutcomeButton = (props) => {
  //const handleClick = () => props.dispatch(showForm(true))
  const { setEditing } = props;
  return <button className="outcome-button" onClick={(e) => setEditing(true, e)}>add</button> 
}

export default connect()(OutcomeButton);