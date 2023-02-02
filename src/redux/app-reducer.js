import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = 'reactpr/app/SET_INITIALIZED';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return { ...state, initialized: true };
        default:
            return state;
    }
}

export const initializeSuccessed = () => ({ type: SET_INITIALIZED})

export const initializeApp = () => dispatch => {
    Promise.all([
        dispatch(getAuthUserData())
    ]).then(() => {
        dispatch(initializeSuccessed())
    })
}

export default appReducer;