import React from 'react';
import './outcome-form.css';

export default class OutcomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  
    this.onSubmit = this.onSubmit.bind(this); //what does this do
  }
  
  onSubmit(event) {
    event.preventDefault();
    const whatText = this.whatTextInput.value.trim();
    const whyText = this.whyTextInput.value.trim();
    const outcomeDate = new Date(this.outcomeDate.value.replace(/-/g, '\/')); 
    const range = 1825;
    if(whatText && outcomeDate && this.props.onAdd) {
      this.props.onAdd(whatText, whyText, outcomeDate, range)
    }
    console.log(`Here's the whatText ${whatText} and whyText ${whyText} and the date ${outcomeDate}`);
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }

  setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if(!this.state.editing) {
      return (
        <div className="add-button"
          onClick={() => this.setEditing(true)}>
          <a className="show-form-link" href="#">Add Outcome</a>
        </div>
      );
    }
    return (
      <form className="add-form" onSubmit={this.onSubmit}>   
        <input type="text" ref={input => this.whatTextInput = input} aria-label={'What\'s your outcome?'} placeholder={`What's your outcome?`}/>
        <input type="text" ref={input => this.whyTextInput = input} aria-label={'Why?'} placeholder={`Why?`} />
        <input type="date" ref={input => this.outcomeDate = input} aria-label={'Commit to a date'} />
        <button>Add</button>
        <button type="button" onClick={() => this.setEditing(false)}>
          Cancel
        </button>
      </form>
    );  
  }    
}