import React from 'react';

import {shallow, mount} from 'enzyme';

import Today from './today.js';

describe('<Today />', () => {
  it('Renders without crashing', () => {
    shallow(<Today outcomes={[]} />)
  });

  it('renders parent div with class time-highlight if range is 1', () => {
    const wrapper = shallow(<Today range={1} outcomes={[]} />)
    expect(wrapper.hasClass('time-highlight')).toEqual(true);
  });
});