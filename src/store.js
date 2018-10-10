import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {reducer} from './reducers';


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    data: reducer
  }), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

  // Hydrate the authToken from localStorage if it exist
const dataFromLocalStorage = loadAuthToken();
if (dataFromLocalStorage) {
    
    const token = dataFromLocalStorage.authToken;
    const startDate = dataFromLocalStorage.startDate;
    const endDate = dataFromLocalStorage.endDate;
    const userId = dataFromLocalStorage.userId;
    
    store.dispatch(setAuthToken(token, startDate, endDate, userId));
    store.dispatch(refreshAuthToken());
}

export default store;