import React from 'react';
import './outcome-form.css';

export default class OutcomeForm extends React.Component {
  render() {
    return (
      <form>   
        <input type="text" aria-label={'What\'s your outcome?'} placeholder={`What's your outcome?`}/>
        <input type="text" aria-label={'Why?'} placeholder={`Why?`} />
        <input type="date" aria-label={'Commit to a date'} />
        <button>Add</button>
      </form>
    );  
    }
    
}