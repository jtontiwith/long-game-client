import React from 'react';

import {shallow, mount} from 'enzyme';

import { OutcomeForm } from './outcome-form.js';

import {clearOutcome} from "../actions";

describe('<OutcomeForm />', () => {
  it('Renders without crashing', () => {
    shallow(<OutcomeForm />)
  });
  
  it('Renders add button to pop form', () => {
    const wrapper = shallow(<OutcomeForm />)
    expect(wrapper.hasClass('add-button')).toEqual(true);
  });

  it('Should render the add form when editing', () => {
    const wrapper = shallow(<OutcomeForm />);
    wrapper.instance().setEditing(true);
    wrapper.update();
    expect(wrapper.hasClass('add-form')).toEqual(true);
  });
  //this fails because of the dispatch in the setEditing method, what to do about that


});