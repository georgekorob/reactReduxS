import s from './FormsControl.module.css'
import {Field} from "redux-form";
import React from "react";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <span> {children} </span>
            { hasError && <span>{error}</span> }
        </div>
    )
}

export const Textarea = props => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = props => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field component={component} validate={validators}
               name={name} placeholder={placeholder}
               {...props}/>{text}
    </div>
}