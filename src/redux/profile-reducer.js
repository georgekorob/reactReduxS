import userPhoto from '../assets/images/defaultUser.webp'
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'reactpr/profile/ADD_POST';
const DELETE_POST = 'reactpr/profile/DELETE_POST';
const UPDATE_NEW_POST_TEXT = 'reactpr/profile/UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'reactpr/profile/SET_USER_PROFILE';
const SET_STATUS = 'reactpr/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'reactpr/profile/SAVE_PHOTO_SUCCESS';
const SET_EDIT_MODE = 'reactpr/profile/SET_EDIT_MODE';

let initialState = {
    posts: [
        {id: 1, text: 'Hi, whats up!', likesCount: 2, img_src: userPhoto},
        {id: 2, text: 'It\'s first', likesCount: 5, img_src: userPhoto},
        {id: 3, text: 'Hello!', likesCount: 4, img_src: userPhoto},
    ],
    newPostText: 'itkama',
    profile: null,
    status: 'def_status',
    editMode: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts[state.posts.length - 1].id + 1,
                text: action.newPost,
                likesCount: 0,
                img_src: '',
            }
            return { ...state, posts: [...state.posts, newPost] };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.id) };
        case UPDATE_NEW_POST_TEXT:
            return { ...state, newPostText: action.newText };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_STATUS:
            return { ...state, status: action.status };
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: {...state.profile, photos: action.photos} };
        case SET_EDIT_MODE:
            return { ...state, editMode: action.editMode };
        default:
            return state;
    }
}

export const addPostC = (newPost) => ({type: ADD_POST, newPost})
export const deletePostC = (id) => ({type: DELETE_POST, id})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccessC = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setEditModeC = (editMode) => ({type: SET_EDIT_MODE, editMode})

export const getProfileT = userId => async dispatch => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatusT = userId => async dispatch => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatusT = status => async dispatch => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) dispatch(setStatus(status));
    } catch (error) {
        console.error(`updateStatus error: ${error.response.status}`)
    }
}

export const savePhotoT = file => async dispatch => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) dispatch(savePhotoSuccessC(data.data.photos));
}

export const saveProfileT = profile => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getProfileT(userId));
        dispatch(setEditModeC(false));
    }
    else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error!";
        dispatch(stopSubmit('edit-profile', {_error: message}));
        // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': message}}));
        // return Promise.reject(message);
    }
}

export default profileReducer;