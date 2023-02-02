import React from "react";
import s from './Users.module.css'
import defaultUserPhoto from '../../assets/images/defaultUser.webp'
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, follow, unfollow}) => {
    return <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.imgUser} src={user.photos.small || defaultUserPhoto} alt=''/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => { unfollow(user) }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => { follow(user) }}>Follow</button>}
            </div>
        </span>
        <span>
            <span><div>{user.name}</div>
            <div>Status: {user.status}</div></span>
        </span>
    </div>
}

export default User;