import axios from "axios";
import {
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	USERLIST_LOADING,
	USERLIST_SUCCESS,
	USERLIST_FAILURE
} from '../actions/constants';
import {SERVERURL} from '../../config';

export function loginLoading(){
	return{
		type: LOGIN_LOADING,
	};
}

export function loginSuccess(payload){
	return{
		type: LOGIN_SUCCESS,
		payload : payload
	};
}
export function loginFailure(payload){
	return{
		type: LOGIN_FAILURE,
		payload : payload
	};
}
export function userLogin(userinfo) {
	const data = userinfo;
	console.log(data,"data")
	return (dispatch) => {
		dispatch (loginLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			url : `${SERVERURL}loginuser`,
			crossDomain : true,
			data,
			}).then((res) => {
				//console.log(res.data,"sudhakaran")
				if(res.status === 200) {
					dispatch(loginSuccess(res.data));
				}
			}).catch((error) => {

				if (error.response ) {
					dispatch(loginFailure(error.response));
			}
		});
		};
	}
export  function registerLoading(){
	return {
		type: REGISTER_LOADING,
	};
}
export function registerSuccess(payload){
	return{
		type: REGISTER_SUCCESS,
		payload : payload
	};
}
export function registerFailure(payload){
	return{
		type: REGISTER_FAILURE,
		payload : payload
	};
}
export function userRegister(userinfo) {
	const data = userinfo;
	console.log(data,"data")
	return (dispatch) => {
		dispatch (registerLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			url : `${SERVERURL}registeruser`,
			crossDomain : true,
			data,
			}).then((res) => {
				if(res.status === 200) {
					dispatch(registerSuccess(res.data));
				}
			}).catch((error) => {
				if (error.response) {
					dispatch(registerFailure(error.response));
			}
		});
	};
}
export function userListLoading(){
	return{
		type: USERLIST_LOADING,
	};
}

export function userListSuccess(payload){
	return{
		type: USERLIST_SUCCESS,
		payload : payload
	};
}
export function userListFailure(payload){
	return{
		type: USERLIST_FAILURE,
		payload : payload
	};
}
export function userList() {
	return (dispatch) => {
		dispatch (userListLoading());
		axios({
			method: "GET",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			url : `${SERVERURL}userlist`,
			crossDomain : true,
			}).then((res) => {
				console.log(res.data)
				if(res.status === 200) {
					dispatch(userListSuccess(res.data));
				}
			}).catch((error) => {
				if (error.response ) {
					dispatch(userListFailure(error.response));
			}
		});
	};
}