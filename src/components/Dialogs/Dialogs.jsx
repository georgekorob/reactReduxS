import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import Message from "./Message/Message";
import {Textarea} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLengthVal = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field component={Textarea}
                    validate={[required, maxLengthVal]}
                    name='newMessage'
                    placeholder='Enter your message!'/></div>
        <div><button>Send message</button></div>
    </form>
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

const Dialogs = (props) => {
    if (props.isAuth === false) return <Navigate to='/login'/>
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessage);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)}
            </div>
            <div className={s.messages}>
                {props.messages.map(m => <Message text={m.text} key={m.id}/>)}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;