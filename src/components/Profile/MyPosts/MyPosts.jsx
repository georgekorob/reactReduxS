import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {required, maxLengthCreator} from "../../../utils/validators";

const maxLengthVal = maxLengthCreator(200);

const AddPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field component={Textarea}
                    validate={[required, maxLengthVal]}
                    name='newPost' placeholder='Post message...'/></div>
        <div><button>New post</button></div>
    </form>
}

const AddPostReduxForm = reduxForm({ form: 'profileAddPostReduxForm' })(AddPostsForm);

const MyPosts = React.memo((props) => {
    let addNewPost = (values) => {
        props.addPost(values.newPost);
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {[...props.posts].reverse().map(p => <Post text={p.text} image_src={p.img_src} likes={p.likesCount} key={p.id}/>)}
            </div>
        </div>
    )
});

export default MyPosts;