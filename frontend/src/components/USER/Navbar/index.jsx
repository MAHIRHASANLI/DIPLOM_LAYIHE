import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css"
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  const [navSize, setnavSize] = useState("70px");
  const [navColor, setnavColor] = useState("rgba(110, 110, 110, 0.4)");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("rgb(0,0,0)") : setnavColor("rgba(110, 110, 110, 0.4)");
    window.scrollY > 10 ? setnavSize("65px") : setnavSize("70px");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <div>
    <nav
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
      }}

    >
       <div className={style.navbar}>
       <img style={{width:"82px", height:"21px" }} src="https://preview.colorlib.com/theme/alime/img/core-img/logo.png" alt="" />
      <div className={style.Link}>
      <Link to="/"><span className={style.link}>Home</span></Link>
      <Link  to="/about"><span className={style.link}>About</span></Link>
      <Link to="/galery"><span className={style.link}>Gallery</span></Link>
      <Link to="/blog"><span className={style.link}>Blog</span></Link>
      <Link to="/contact"><span className={style.link}>Contact</span></Link>
      <Link to="/admin"><span className={style.link}>admin_/</span></Link>
      </div>
      <div className={style.icons}>
      <SearchIcon />
      </div>
       </div>
    </nav>
  </div>
  )
}

export default Navbar