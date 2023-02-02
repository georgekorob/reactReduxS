import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            {props.sidebar.map(m => {
                return (
                    <div className={s.item} key={m.id}>
                        <NavLink to={m.path}
                        className={({isActive}) => (isActive ? s.active : '')}>
                            {m.name}
                        </NavLink>
                    </div>
                );
            })}
        </nav>
    )
}

export default Navbar;