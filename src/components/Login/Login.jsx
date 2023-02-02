import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import s from "../common/FormsControl/FormsControl.module.css"

const maxLengthVal = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        {createField("Email","email",[required],Input)}
        {createField("Password","password",
            [required, maxLengthVal],Input,{type: "password"})}
        {createField(null,"rememberMe",
            [],Input,{type: "checkbox"}, "Remember me")}
        { captchaUrl && <div>
            <img src={captchaUrl}/>
            {createField("sym from image","captcha",[required],Input)}
        </div>}
        { error && <div className={s.formSummaryError}>
            {error}
        </div> }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({login, isAuth, captchaUrl}) => {
    const onSubmit = ({email, password, rememberMe, captcha}) => {
        login(email, password, rememberMe, captcha);
    }
    if (isAuth) return <Navigate to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);