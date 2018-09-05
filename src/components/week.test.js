import React from 'react';

import {shallow, mount} from 'enzyme';

import Week from './week.js';

describe('<Week />', () => {
  it('Renders without crashing', () => {
    shallow(<Week outcomes={[]} />)
  });

  it('renders parent div with class time-highlight if range is 7', () => {
    const wrapper = shallow(<Week range={7} outcomes={[]} />)
    expect(wrapper.hasClass('time-highlight')).toEqual(true);
  });

});