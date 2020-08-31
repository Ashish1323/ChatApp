import {
	CHAT_INSERT_LOADING ,
	CHAT_INSERT_SUCCESS,
	CHAT_INSERT_FAILURE,
 	CHAT_LIST_LOADING ,
	CHAT_LIST_SUCCESS,
 	CHAT_LIST_FAILURE
 } from '../actions/constants';

const initialState ={
	chatInsert: {},
	chatInsertSuccess: false,
	chatList: {},
	chatListSuccess: false,
}

export default function chatReducer(state,action) {
	//console.log(SERVERURL,"data")
	if(typeof state === 'undefined') {
		return initialState
	}
	switch (action.type) {
		case CHAT_INSERT_LOADING:
		return{
			...state,
			chatInsertSuccess: false
	}
		case CHAT_INSERT_SUCCESS:
			return {
				...state,
				chatInsertSuccess: true,
				chatInsert: action.payload
			}
		case CHAT_INSERT_FAILURE:
			return {
				...state,
				chatInsertSuccess: false,
				chatInsert: action.payload
			}
		case CHAT_LIST_LOADING:
			return {
				...state,
				chatListSuccess:false,
			}
		case CHAT_LIST_SUCCESS:
			return {
				...state,
				chatListSuccess:true,
				chatList:action.payload
			}
				case CHAT_LIST_FAILURE:
					return{
						...state,
						chatListSuccess:false,
						chatList: action.payload
					}
				case CHAT_LIST_LOADING:
					return{
						...state,
						chatListSuccess:false,
					}
				case CHAT_LIST_SUCCESS:
					return {
						...state,
						chatListSuccess: true,
						chatList: action.payload
					}
					case CHAT_LIST_FAILURE:
						return{
							chatListSuccess:false,
							chatList:action.payload
						}
						default:
						return state;
					}
				}