import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderAPIComponent extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

const HeaderContainer = connect(mapStateToProps,
    { logout })(HeaderAPIComponent);

export default HeaderContainer;