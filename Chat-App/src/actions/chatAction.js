import axios from "axios";
import {
	CHAT_INSERT_LOADING,
	CHAT_INSERT_SUCCESS,
	CHAT_INSERT_FAILURE,
	CHAT_LIST_LOADING,
	CHAT_LIST_SUCCESS,
	CHAT_LIST_FAILURE
} from '../actions/constants';
import {SERVERURL} from '../../config';

export function chatInsertLoading() {
	return{
		type: CHAT_INSERT_LOADING,
	};
}
export function chatInsertSuccess(payload) {
	return {
		type : CHAT_INSERT_SUCCESS,
		payload : payload
	};
}
export function chatInsertFailure(payload) {
	return {
		type : CHAT_INSERT_FAILURE,
		payload : payload
	};
}
export function chatInsert(chatdetails) {
	const data = chatdetails;
	//console.log(data,"Action");
	return (dispatch) => {
		dispatch(chatInsertLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			url : `${SERVERURL}chatinsert`,
			crossDomain : true,
			data,
			}).then((res) => {
				if(res.status === 200) {
					dispatch(chatInsertSuccess(res.data));
				}
			}).catch((error) => {
				if (error.response.status === 400) {
					dispatch(chatInsertFailure(error.response));
			}
		});
		};
	}


export function chatListLoading() {
	return{
		type: CHAT_LIST_LOADING,
	};
}
export function chatListSuccess(payload) {
	return {
		type : CHAT_LIST_SUCCESS,
		payload : payload
	};
}
export function chatListFailure(payload) {
	return {
		type : CHAT_LIST_FAILURE,
		payload : payload
	};
}
export function chatList(data) {
	//const data = chatdetails;
	//console.log(data,"Action");
	return (dispatch) => {
		dispatch (chatListLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			url : `${SERVERURL}chatlist`,
			crossDomain : true,
			data,
			}).then((res) => {
				if(res.status === 200) {
					dispatch(chatListSuccess(res.data));
				}
			}).catch((error) => {
				if (error.response.status === 400) {
					dispatch(chatListFailure(error.response));
			}
		});
	};
}
