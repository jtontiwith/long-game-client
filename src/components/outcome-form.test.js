import React from 'react';

import {shallow, mount} from 'enzyme';

import { OutcomeForm } from './outcome-form.js';

describe('<OutcomeForm />', () => {
  it('Renders without crashing', () => {
    shallow(<OutcomeForm />)
  });
});