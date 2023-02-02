import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControl/FormsControl";
import sf from "../../common/FormsControl/FormsControl.module.css"
import s from './ProfileInfo.module.css'
import {reduxForm} from "redux-form";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button onClick={()=>{}}>Save</button></div>
        { error && <div className={sf.formSummaryError}>{error}</div> }
        <div><b>Full name:</b> {createField("","fullName",[],Input)}</div>
        <div><b>Looking for a job</b> {createField(null,"lookingForAJob",
            [],Input,{type: "checkbox"})}</div>
        <div><b>Skills:</b> {createField("Skills:","lookingForAJobDescription",[],Textarea)}</div>
        <div><b>About me:</b> {createField("About me:","aboutMe",[],Textarea)}</div>
        <div><b>Contacts:</b>
            { Object.keys(profile.contacts).map(key => {
                return <div className={s.contact} key={key}>
                    <b>{key}:</b> {createField("","contacts."+key,[],Input)}
                </div>
            })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataReduxForm;