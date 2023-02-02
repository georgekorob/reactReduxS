const SEND_MESSAGE = 'reactpr/dialogs/SEND_MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: state.messages[state.messages.length - 1].id + 1,
                text: action.newMessage
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        default:
            return state;
    }
}

export const sendMessageC = (newMessage) => ({ type: SEND_MESSAGE, newMessage })

export default dialogsReducer;