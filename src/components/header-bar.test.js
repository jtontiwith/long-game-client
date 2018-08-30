import React from 'react';
//import configureStore from 'redux-mock-store'
import {shallow, mount} from 'enzyme';
import HeaderBar from './header-bar';
import {login} from '../actions/auth';
import {store} from '../store';

describe('<HeaderBar />', () => {
  
  it('Renders without crashing', () => {
    dispatch(login('jtonti@gmail.com', 'job1234567'))
    shallow(
      <Provider store={store}>
        <HeaderBar />
      </Provider>
    )
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