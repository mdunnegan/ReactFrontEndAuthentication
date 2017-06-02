import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_MESSAGE
} from './types';

export const ROOT_URL = 'http://localhost:3090';

// always returns an object!
// because we installed redux-thunk, a function is now a valid return value

export function signinUser({email, password}) {

	// we can put a lot of logic (lol) here
	// function automatically called when returned
	return function(dispatch){
		// submit email/password to server
		axios.post(ROOT_URL + '/signin', { email, password })
			.then(response => {
				// if request is good
				// - update state (to indicate auth status)
				dispatch({ type: AUTH_USER, payload: { email } });
				// - save jwt token to local storage
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('email', email);

				browserHistory.push('/create');
			})
			.catch(() => {
				// if request is bad show an error to the user
				dispatch(authError('Bad Login Credentials'));
			});
	};
}

export function signupUser({email, password}) {

	// we can put a lot of logic (lol) here
	// function automatically called when returned
	return function(dispatch){
		// submit email/password to server
		axios.post(ROOT_URL + '/signup', { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER, payload: { email } });
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('email', email);
				browserHistory.push('/create');
			})
			.catch((response) => {
				dispatch(authError('Yeah, we dont know'));
			});
	};
}

export function signoutUser() {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') }
		}).then(response => {
			dispatch({ 
				type: FETCH_MESSAGE,
				payload: response.data.message 
			});
		});
	}
}

