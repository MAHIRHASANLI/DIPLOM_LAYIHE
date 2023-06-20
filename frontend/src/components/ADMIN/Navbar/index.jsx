import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import style from "./index.module.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className={style.Navbar}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ul className={style.Link}>
              <Link to="/admin">
                <span className={style.link}>
                  Dashboard
                  {/* <div className={style.home_dropdown}>
                    <Link to="/admin/home"><p>Home</p></Link>
                    <Link to="/admin/about"><p>About</p></Link>
                    <Link to="/admin/galery"><p>Gallery</p></Link>
                    <Link to="/admin/blog"><p>Blog</p></Link>
                    <Link to="/admin/contact"><p>Contact</p></Link>
                  </div> */}
                </span>
              </Link>
              <Link to="/admin/home">
                <span className={style.link}>
                  Home
                  {/* <div className={style.home_dropdown}>
                    <Link to="/admin/addSlider">
                      <a href="">Add Slider</a>
                    </Link>
                  </div> */}
                </span>
              </Link>

              <Link className={style.link} to="/admin/about">
                {/* <span className={style.link}> */}
                  About
                  <div className={style.home_dropdown}>
                  <Link to="/admin/passion">
                      <a href="">- Passion</a>
                    </Link>
                    <Link to="/admin/choose">
                      <a href="">- Choose</a>
                    </Link>
                    <Link to="/admin/team">
                      <a href="">- our Team</a>
                    </Link>
                    <Link to="/admin/about">
                      <a href="">- Goo Back</a>
                    </Link>
                  </div>
                {/* </span> */}
              </Link>

              <Link to="/admin/galery">
                <span className={style.link}>
                  Gallery
                  <div className={style.home_dropdown}>
                    <a href="">Hello Galery!</a>
                  </div>
                </span>
              </Link>

              <Link to="/admin/blog">
                <span className={style.link}>
                  Blog
                  <div className={style.home_dropdown}>
                    <p>Hello Blog!</p>
                  </div>
                </span>
              </Link>

              <Link to="/admin/contact">
                <span className={style.link}>Contact</span>
              </Link>

              <Link to="/admin/footer">
                <span className={style.link}>Footer</span>
              </Link>

              <Link to="/admin/follower">
                <span className={style.link}>Follower</span>
              </Link>

              <Link to="/">
                <span className={style.link}>user_/</span>
              </Link>
            </ul>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
