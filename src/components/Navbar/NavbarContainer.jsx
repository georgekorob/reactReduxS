import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}

let mapDispatchToProps = (dispatch) => { return { } }

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;