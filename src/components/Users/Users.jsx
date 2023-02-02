import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize,  ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        {props.users.map(u => <User user={u} key={u.id}
                                    followingInProgress={props.followingInProgress}
                                    follow={props.follow} unfollow={props.unfollow}/>)}
    </div>
}

export default Users;