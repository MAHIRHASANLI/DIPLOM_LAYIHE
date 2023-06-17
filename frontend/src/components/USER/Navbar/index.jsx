import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.css"
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  const [navSize, setnavSize] = useState("75px");
  const [navColor, setnavColor] = useState("rgba(110, 110, 110, 0.4)");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("rgb(0,0,0)") : setnavColor("rgba(110, 110, 110, 0.4)");
    window.scrollY > 10 ? setnavSize("70px") : setnavSize("75px");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <nav
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
      }}

    >
       <div className={style.navbar}>
       <img style={{width:"82px", height:"22px" }} src="https://preview.colorlib.com/theme/alime/img/core-img/logo.png" alt="" />
        
        <ul className="navbar_nav">
            <NavLink className={style.navbar_nav_link} to="/">Home</NavLink>
            <NavLink className={style.navbar_nav_link} to="/about">About</NavLink>
            <NavLink className={style.navbar_nav_link} to="/galery">Gallery</NavLink>
            <NavLink className={style.navbar_nav_link} to="/blog">Blog</NavLink>
            <NavLink className={style.navbar_nav_link} to="/contact">Contact</NavLink>
            <NavLink className={style.navbar_nav_link}  style={({isActive})=>{return{color: isActive? 'skyblue': ''}}} to="/admin">admin-/</NavLink>
        </ul>
     <a role="button" className={style.icons}>
      <SearchIcon />
      </a>
       </div>
    </nav>
  )
}

export default Navbar