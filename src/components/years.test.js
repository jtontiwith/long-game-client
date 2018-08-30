import React from 'react';

import {shallow, mount} from 'enzyme';

import { Years } from './years.js';

describe('<Years />', () => {
  it('Renders without crashing', () => {
    shallow(<Years outcomes={[]} />)
  });
});