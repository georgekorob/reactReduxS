import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode: true});
    }
    deActivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value});
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.editMode
                        ? <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                                 value={this.state.status}/>
                        : <span onDoubleClick={this.activateEditMode}>{this.props.status || '///'}</span>
                    }
                </div>
            </div>
        )
    }
}

export default ProfileStatus;