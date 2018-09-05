import React from 'react';

import {shallow, mount} from 'enzyme';

import Year from './year.js';

describe('<Year />', () => {
  it('Renders without crashing', () => {
    shallow(<Year outcomes={[]} />)
  });

  it('renders parent div with class time-highlight if range is 365', () => {
    const wrapper = shallow(<Year range={365} outcomes={[]} />)
    expect(wrapper.hasClass('time-highlight')).toEqual(true);
  });

});