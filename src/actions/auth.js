import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (currentUser, userId, startDate, endDate) => ({
    type: AUTH_SUCCESS,
    currentUser,
    userId,
    startDate,
    endDate
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, userId, startDate, endDate, dispatch) => {
    console.log(`does startDate ${startDate} and endDate ${endDate} show?`);
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user, userId, startDate, endDate));
    saveAuthToken(authToken, userId, startDate, endDate);
};

//login action 
export const login = (email, password) => dispatch => {
    dispatch(authRequest());
    console.log(`the email ${email} and password ${password}`)
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            }) 
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            //.then(res => console.log(res.json())) <-why does loggin this to the console make the rest the .then chain fail
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken, userId, startDate, endDate}) => storeAuthInfo(authToken, userId, startDate, endDate, dispatch))
            //.then(({authToken, userId}) => storeAuthInfo(authToken, userId, dispatch))
            .then(res => console.log('do we make it to here?'))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect email or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};

//refresh action 
export const refreshAuthToken = (userId, startDate, endDate) => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    //const startDateFromStore = getState().auth.startDate;
    //const endDateFromStore = getState().auth.endDate;
    //console.log(`start ${startDateFromStore} and end ${endDateFromStore}`)
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        //.then(res => console.log(res.json()))
        .then(({authToken}) => storeAuthInfo(authToken, userId, startDate, endDate, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};