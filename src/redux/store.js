import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Egor'},
                {id: 4, name: 'Sveta'},
                {id: 5, name: 'Valera'},
                {id: 6, name: 'Victor'},
            ],
            messages: [
                {id: 1, text: 'Hi'},
                {id: 2, text: 'How are you?'},
                {id: 3, text: 'Yo!'},
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: 1, text: 'Hi, whats up!', likesCount: 2, img_src: 'https://uprostim.com/wp-content/uploads/2021/03/image096-74.jpg'},
                {id: 2, text: 'It\'s first', likesCount: 5, img_src: 'https://avatars.mds.yandex.net/i?id=74f51c3bccf3f4a657b31580ad350bb0-4034313-images-thumbs&ref=rim&n=33&w=150&h=150'},
                {id: 3, text: 'Hello!', likesCount: 4, img_src: 'https://avatars.mds.yandex.net/i?id=9f4cdf5cf7ae6a096cf0e5574195ceff-5394818-images-thumbs&ref=rim&n=33&w=150&h=150'},
            ],
            newPostText: 'itkama',
        },
        sidebar: [
            {id: 1, path: '/profile', name: 'Profile'},
            {id: 2, path: '/dialogs', name: 'Messages'},
            {id: 3, path: '/1', name: 'News'},
            {id: 4, path: '/2', name: 'Music'},
            {id: 5, path: '/', name: 'About'},
        ]
    },
    _subscriber() {
        console.log('no subscribers');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._subscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._subscriber();
    }
}

export default store;