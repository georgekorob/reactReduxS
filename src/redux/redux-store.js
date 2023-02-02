import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogPage: dialogsReducer,
        usersPage: usersReducer,
        sidebar: sidebarReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    },
});

window.store = store;

export default store;