import React from 'react';

import {shallow, mount} from 'enzyme';

import Month from './month.js';

describe('<Month />', () => {
  it('Renders without crashing', () => {
    shallow(<Month outcomes={[]} />)
  });

  it('renders parent div with class time-highlight if range is 30', () => {
    const wrapper = shallow(<Month range={30} outcomes={[]} />)
    expect(wrapper.hasClass('time-highlight')).toEqual(true);
  });


});