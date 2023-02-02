import React, {lazy, Suspense} from "react";
import './App.css';
import Footer from './components/Footer';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import withRouter from "./hoc/withRouter";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
    catchAllUnhandledErrors = (event) => {
        alert("Some error!");
        console.error(event);
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route exact path='/' element={<Navigate to={'/profile'}/>}/>
                            <Route path='/dialogs/:userId?' element={<DialogsContainer/>}/>
                            <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='*' element={<div>404 PAGE NOT FOUND</div>}/>
                        </Routes>
                    </Suspense>
                </div>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);

let SamuraiJSAPP = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSAPP;
