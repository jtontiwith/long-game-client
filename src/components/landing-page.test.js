import React from 'react';

import {shallow} from 'enzyme';

import { LandingPage } from './landing-page.js';

describe('<LandingPage />', () => {
  it('Renders without crashing', () => {
   const wrapper = shallow(<LandingPage loggedin={false} />)
   expect(wrapper.hasClass('home')).toEqual(true); 
  });
});





















