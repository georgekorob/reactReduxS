import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'reactpr/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'reactpr/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const setCaptchaUrl = (captchaUrl) => (
    { type: SET_CAPTCHA_URL, payload: { captchaUrl } })

export const getAuthUserData = () => async dispatch => {
    const data = await authAPI.isAuth();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async dispatch => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) dispatch(getAuthUserData());
    else {
        if (data.resultCode === 10) dispatch(getCaptchaUrl());
        let message = data.messages.length > 0 ? data.messages[0] : "Some error!";
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const getCaptchaUrl = () => async dispatch => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}

export const logout = () => async dispatch => {
    const data = await authAPI.logout();
    if (data.resultCode === 0)
        dispatch(setAuthUserData(null, null, null, false));
}

export default authReducer;