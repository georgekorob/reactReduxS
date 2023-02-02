import profileReducer, {addPostC, deletePostC} from "./profile-reducer";

let initState = {
    posts: [
        {id: 1, text: 'Hi, whats up!', likesCount: 2, img_src: null},
        {id: 2, text: 'It\'s first', likesCount: 5, img_src: null},
        {id: 3, text: 'Hello!', likesCount: 4, img_src: null},
    ],
    newPostText: 'itkama',
    profile: null,
    status: 'def_status'
}

it('new post should be added', () => {
    // 1. test data
    let action = addPostC('it-kama');
    let state = {...initState, posts: [...initState.posts]}

    // 2. action
    let newState = profileReducer(state, action)

    // 3. inspect
    expect(newState.posts.length).toBe(4);
})

it('message should be correct', () => {
    // 1. test data
    let mes = 'it-kama';
    let action = addPostC(mes);
    let state = {...initState, posts: [...initState.posts]}

    // 2. action
    let newState = profileReducer(state, action)

    // 3. inspect
    expect(newState.posts[3].text).toBe(mes);
})

it('deleting post', () => {
    // 1. test data
    let action = deletePostC(1);
    let state = {...initState, posts: [...initState.posts]}

    // 2. action
    let newState = profileReducer(state, action)

    // 3. inspect
    expect(newState.posts.length).toBe(2);
})

it('deleting post, length posts shouldn\'t be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePostC(10000);
    let state = {...initState, posts: [...initState.posts]}

    // 2. action
    let newState = profileReducer(state, action)

    // 3. inspect
    expect(newState.posts.length).toBe(3);
})
