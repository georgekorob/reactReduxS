import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultUserPhoto from '../../../assets/images/defaultUser.webp'
import ProfileDataForm from "./ProfileDataForm";

const Contact = ({contactTitle, contactValue}) => {
    if (contactValue) return <div><b>{contactTitle}: </b>{contactValue}</div>
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        { isOwner && <div><button onClick={goToEditMode}>Edit</button></div> }
        <div><b>Full name:</b> {profile.fullName}</div>
        <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</div>
        {profile.lookingForAJob && <div>
            <b>Skills:</b> {profile.lookingForAJobDescription}</div>}
        <div><b>About me:</b> {profile.aboutMe}</div>
        <div><b>Contacts:</b>
            { Object.keys(profile.contacts).map(key => {
                return <Contact contactTitle={key} key={key}
                         contactValue={profile.contacts[key]}/>
            })}
        </div>
    </div>
}

const ProfileInfo = ({profile, status, editMode, updateStatus, isOwner,
                         savePhoto, saveProfile, setEditMode}) => {
    if (!profile) return <Preloader/>
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) savePhoto(e.target.files[0]);
    }
    const onSubmit = (formData) => {
        saveProfile(formData);
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} alt=''
                     src={profile.photos.large || defaultUserPhoto}/>
                <div>{isOwner && <input type='file'
                                        onChange={onMainPhotoSelected}/>}</div>
                { editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}
                                       profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner}
                                   goToEditMode={()=>setEditMode(true)}/> }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;