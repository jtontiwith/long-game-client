import React from 'react';

import {shallow, mount} from 'enzyme';

import { Board } from './board.js';

describe('<Board />', () => {
  
  it('Renders without crashing', () => {
    const dispatch = jest.fn()
    shallow(<Board dispatch={dispatch} outcomes={[]} />)
  });

  it('dispatches the fetchBoard action after component mounts', () => {
    //mount(<Board dispatch={dispatch} outcomes={[]} />)
    const dispatch = jest.fn()
    const board = shallow(<Board dispatch={dispatch} outcomes={[]} />, { lifecycleExperimental: true });
    const spyCDM = jest.spyOn(Board.prototype, 'componentDidMount');
  })
});