import React from 'react';

import {shallow, mount} from 'enzyme';

import Week from './week.js';

describe('<Week />', () => {
  it('Renders without crashing', () => {
    shallow(<Week outcomes={[]} />)
  });
});