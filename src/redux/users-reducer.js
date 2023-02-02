import {usersAPI} from "../api/api";
import {updateObjectsInArray} from "../utils/object-helpers";

const FOLLOW = 'reactpr/users/FOLLOW';
const UNFOLLOW = 'reactpr/users/UNFOLLOW';
const SET_USERS = 'reactpr/users/SET_USERS';
const SET_CURRENT_PAGE = 'reactpr/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'reactpr/users/SET_TOTAL_COUNT';
const TOOGLE_IS_FETCHING = 'reactpr/users/TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'reactpr/users/TOOGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 31,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [ ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId,
                                            'id',  {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId,
                                            'id',  {followed: false})
            };
        case SET_USERS:
            return { ...state, users: [ ...action.users] };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case TOOGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOOGLE_IS_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)};
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unFollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => async dispatch => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, userId, actionCreator, isFollowed) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await usersAPI.followUser(userId, isFollowed);
    if (data.resultCode === 0) dispatch(actionCreator(userId));
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (user) => async dispatch => {
    await followUnfollowFlow(dispatch, user.id, followSuccess, false);
}

export const unfollow = (user) => async dispatch => {
    await followUnfollowFlow(dispatch, user.id, unFollowSuccess, true);
}

export default usersReducer;