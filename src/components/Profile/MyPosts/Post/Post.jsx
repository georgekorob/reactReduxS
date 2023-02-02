import React from "react";
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={props.image_src} alt=''/>
            {props.text}
            <div>
                <span>{props.likes}</span>
            </div>
        </div>
    )
}

export default Post;