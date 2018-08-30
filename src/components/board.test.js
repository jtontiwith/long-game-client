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


  /*
  it('renders <Years /> <Year /> <Month /> <Week /> and <Today /> components', () => {
    const dispatch = jest.fn()
    const wrapper = shallow(<Board dispatch={dispatch} outcomes={[]} />)
    expect(wrapper.find(Years)).to.have.lengthOf(1);
    expect(wrapper.find(Year)).to.have.lengthOf(1);
    expect(wrapper.find(Month)).to.have.lengthOf(1);
    expect(wrapper.find(Week)).to.have.lengthOf(1);
    expect(wrapper.find(Today)).to.have.lengthOf(1);
  });
  */


});