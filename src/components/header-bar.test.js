import React from 'react';
//import configureStore from 'redux-mock-store'
import {shallow, mount} from 'enzyme';
import { HeaderBar } from './header-bar';



describe('<HeaderBar />', () => {
  
  it('Renders without crashing', () => {
    const wrapper = shallow(<HeaderBar loggedIn={true} />)
    expect(wrapper.find('button').hasClass('logout-button')).toEqual(true);
  });
  
  


});

/* ATTEMPT WITH MOCK


import React from 'react';
import configureStore from 'redux-mock-store'
import {shallow, mount} from 'enzyme';
import { HeaderBar } from './header-bar';

const initialState = {email: "jtonti@gmail.com"}; 
const mockStore = configureStore();


describe('<HeaderBar />', () => {
  it('Renders without crashing', () => {
    shallow(<HeaderBar />)
  });
  
  beforeEach(() => {
    let store = mockStore(initialState)
    it('Renders with a store', () => {
      let wrapper = mount(<HeaderBar store={store} />);
      expect(wrapper.find('WOW')).to.have.lengthOf(1);
      
    });
    //wrapper = see below...
  
  })


});


*/