import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			
			let userDetails;
			if (action.payload) {
				userDetails = { email: action.payload.email }
			}
			
			return { ...state, authenticated: true, errorMessage: '', ...userDetails };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		case FETCH_MESSAGE:
			return { ...state, message: action.payload };
	}
	return state;
}