import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileT, getStatusT, updateStatusT,
    savePhotoT, saveProfileT, setEditModeC
} from "../../redux/profile-reducer";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";
import withRouter from "../../hoc/withRouter";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfileT(userId);
        this.props.getStatusT(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    editMode: state.profilePage.editMode,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getProfileT, getStatusT, updateStatusT,
        savePhotoT, saveProfileT, setEditModeC }),
    withRouter,
    withAuthNavigate
)(ProfileContainer);