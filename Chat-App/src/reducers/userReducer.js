import {
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	USERLIST_LOADING,
	USERLIST_SUCCESS,
	USERLIST_FAILURE } from '../actions/constants';

const initialState ={
	userAuth: {},
	userAuthSuccess: false,
	userList: [],
	userListSuccess: false
}

export default function userReducer(state,action) {
	//console.log(SERVERURL,"data")
	if(typeof state === 'undefined') {
		return initialState
	}
	switch (action.type) {
		case LOGIN_LOADING:
		return{
			...state,
			userAuthSuccess: false
	}
		case LOGIN_SUCCESS:
			return{
				...state,
				userAuthSuccess:true,
				userAuth:action.payload
			}
			case LOGIN_FAILURE:
				return{
					...state,
					userAuthSuccess:false,
					userAuth:action.payload
				}
			case REGISTER_LOADING:
				return{
					...state,
					userAuthSuccess:false,
				}
			case REGISTER_SUCCESS:
				return {
					...state,
					userAuthSuccess:true,
					userAuth:action.payload
				}
				case REGISTER_FAILURE:
					return{
						...state,
						userAuthSuccess:false,
						userAuth: action.payload
					}
				case USERLIST_LOADING:
					return{
						...state,
						userListSuccess:false,
					}
				case USERLIST_SUCCESS:
					return {
						...state,
						userListSuccess: true,
						userList: action.payload
					}
					case USERLIST_FAILURE:
						return{
							userListSuccess:false,
							userList:action.payload
						}
						default:
						return state;
					}
				}