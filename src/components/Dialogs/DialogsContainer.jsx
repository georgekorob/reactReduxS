import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";
import {sendMessageC} from "../../redux/dialogs-reducer";

let mapStateToProps = (state) => ({
    dialogs: state.dialogPage.dialogs,
    messages: state.dialogPage.messages,
})

let mapDispatchToProps = (dispatch) => ({ sendMessage: (newMessage) => dispatch(sendMessageC(newMessage)) })

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate
)(Dialogs);