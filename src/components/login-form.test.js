import React from 'react';

import {shallow, mount} from 'enzyme';

import { LoginForm } from './login-form.js';
import { stub } from 'sinon';

describe('<LoginForm />', () => {
  
  it('Renders without crashing', () => {    
    const onSubmit = stub().withArgs('values');
    shallow(<LoginForm handleSubmit={(values =>
      onSubmit(values))} />)
  });

});