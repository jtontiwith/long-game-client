import React from 'react';

import {shallow, mount} from 'enzyme';

import { Years } from './years.js';

describe('<Years />', () => {
  it('Renders without crashing', () => {
    shallow(<Years outcomes={[]} />)
  });

  it('renders parent div with class time-highlight if range is 1865', () => {
    const wrapper = shallow(<Years range={1825} outcomes={[]} />)
    expect(wrapper.hasClass('time-highlight')).toEqual(true);
  });

});