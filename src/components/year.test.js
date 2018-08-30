import React from 'react';

import {shallow, mount} from 'enzyme';

import Year from './year.js';

describe('<Year />', () => {
  it('Renders without crashing', () => {
    shallow(<Year outcomes={[]} />)
  });
});