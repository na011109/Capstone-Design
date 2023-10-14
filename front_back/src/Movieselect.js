// import React, {useState} from 'react';
import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
// import Img from '../../public/img/'

const Movieselect = () => {

    return (
        <div>
            <h1> 영화 선택 </h1> 
            <NavLink to={"/quiz"}>
            <img src="/img/insideout.jpg" alt="인사이드아웃" />
            </NavLink>
            <NavLink to={"/quiz"}>
            <img src="/img/ironman.jpg" alt="아이언맨" />
            </NavLink>
            <NavLink to={"/quiz"}>
            <img  src="/img/lalaland.jpg" alt="라라랜드" />
            </NavLink>
            <NavLink to={"/quiz"}>
            <img  src="/img/notebook.jpg" alt="노트북" />
            </NavLink>         
            <NavLink to={"/quiz"}>
            <img  src="/img/titanic.jpg" alt="타이타닉" />
            </NavLink>
            <NavLink to={"/quiz"}>
            <img  src="/img/insidious.jpg" alt="인시디어스" />
            </NavLink>
        </div>
        
    )
    

}

export default Movieselect;