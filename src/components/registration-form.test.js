import React from 'react';

import {shallow, mount} from 'enzyme';

import { RegistrationForm } from './registration-form.js';
import { stub } from 'sinon';

describe('<RegistrationForm />', () => {
  
  it('Renders without crashing', () => {    
    const onSubmit = stub().withArgs('values');
    shallow(<RegistrationForm handleSubmit={(values =>
      onSubmit(values))} />)
  });

});