import React from 'react';

import {shallow, mount} from 'enzyme';

import { YearCard } from './year-card.js';

//const outcomeInfo = {id: '5b85a00d40b73f10dda27532'}

describe('<YearCard />', () => {
  it('Renders without crashing', () => {
    shallow(<YearCard outcomeInfo={
      {id: 1,
       whatText: 'finish thinkful',
       whyText: 'so I can get a good job and create value for myself and others',
       date: new Date(),
       range: 1825
      }
    } />)
  });
});