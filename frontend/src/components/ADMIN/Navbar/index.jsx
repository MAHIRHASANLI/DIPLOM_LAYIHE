import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import style from "./index.module.css"
import { Link } from 'react-router-dom';

function Navbar() {
  
  return (
<div className={style.Navbar}>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <div className={style.Link}>
      <Link  to="/admin"><span  className={style.link}>Dashboard
      <div className={style.home_dropdown}>
      <Link  style={{display:"block"}} to="/admin/home">Home</Link>
      <Link style={{display:"block"}}  to="/admin/about">About</Link>
      <Link style={{display:"block"}} to="/admin/galery">Gallery</Link>
      <Link style={{display:"block"}} to="/admin/blog">Blog</Link>
      <Link style={{display:"block"}} to="/admin/contact">Contact</Link>
      </div>
      </span>
      </Link>
      <Link to="/admin/home"><span  className={style.link}>Home
      <div className={style.home_dropdown}>
    <Link  to="/admin/addSlider"><p>Add Slider</p></Link></div>
      </span>
      </Link>
      <Link  to="/admin/about"><span className={style.link}>About
      <div className={style.home_dropdown}>
    <Link to="/admin/choose"><p>Choose Admin</p></Link>
    <Link to="/admin/about"><p>Goo Back</p></Link></div></span></Link>
      <Link to="/admin/galery"><span className={style.link}>Gallery
      <div className={style.home_dropdown}>
    <p>Hello Galery!</p></div></span></Link>
      <Link to="/admin/blog"><span className={style.link}>Blog
      <div className={style.home_dropdown}>
    <p>Hello Blog!</p></div></span></Link>
      <Link to="/admin/contact"><span className={style.link}>Contact</span></Link>
      <Link to="/"><span className={style.link}>user_/</span></Link>
      </div>
        </Toolbar>
      </AppBar>
    </Box>
  
  
</div>
      )
}

export default Navbar