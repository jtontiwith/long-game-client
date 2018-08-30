import React from 'react';

import {shallow, mount} from 'enzyme';

import Month from './month.js';

describe('<Month />', () => {
  it('Renders without crashing', () => {
    shallow(<Month outcomes={[]} />)
  });
});