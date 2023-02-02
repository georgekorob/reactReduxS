import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

export const withAuthNavigate = (Component) => {
    class NavigateComponent extends React.Component {
        render () {
            if (!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForNavigate = (state) => ({ isAuth: state.auth.isAuth })
    return connect(mapStateToPropsForNavigate)(NavigateComponent);
}