import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         editMode={props.editMode}
                         updateStatus={props.updateStatusT}
                         isOwner={!props.params.userId}
                         savePhoto={props.savePhotoT}
                         saveProfile={props.saveProfileT}
                         setEditMode={props.setEditModeC}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;