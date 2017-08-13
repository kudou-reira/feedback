import { FETCH_USER } from '../actions/types';
// return false if user is not logged in
// if not declared 'false', action.payload return is an empty string ''
// in header.js, the action.payload returned through authreducer decides rendering
export default function(state = null, action) {
	switch (action.type){
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}