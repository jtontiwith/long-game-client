import React from 'react';

import {shallow, mount} from 'enzyme';

import { RegistrationPage } from './registration-page.js';

describe('<RegistrationPage />', () => {
  it('Renders without crashing', () => {
    shallow(<RegistrationPage />)
  });
});