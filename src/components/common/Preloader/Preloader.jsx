import React from "react";
import s from './Preloader.module.css'
import loading_gif from "../../../assets/images/loading.gif";

const Preloader = (props) => {
    return <img src={loading_gif} alt='' className={s.imgLoading}/>
}

export default Preloader;