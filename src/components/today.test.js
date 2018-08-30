import React from 'react';

import {shallow, mount} from 'enzyme';

import Today from './today.js';

describe('<Today />', () => {
  it('Renders without crashing', () => {
    shallow(<Today outcomes={[]} />)
  });
});