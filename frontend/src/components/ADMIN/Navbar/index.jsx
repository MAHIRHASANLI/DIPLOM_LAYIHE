import * as React from "react";
import style from "./index.module.css";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuIcon from "@mui/icons-material/Menu";


function Navbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 150 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin">
            - Dashboard
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/home">
            - Slider
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink
            className={style.hamburger_menu}
            style={{ color: "black" }}
            to="/admin/about"
          >
            - About
            <div className={style.hamburger_dropdown}>
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
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/galery">
            - Gallery
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/blog">
            - Blog
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/contact">
            - Contact
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/follower">
            - Follower
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/admin/footer">
            - Footer
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "50px 30px 0" }}>
          <NavLink style={{ color: "rgb(252,96,96)" }} to="/admin/footer">
            <ArrowBackIosIcon /> User
          </NavLink>
        </li>
      </List>
    </Box>
  );

  return (
    <div className={style.navbar}>
      <ul className={style.navbar_item}>
        <Link to="/admin">
          <span className={style.link}>Dashboard</span>
        </Link>
        <Link to="/admin/home">
          <span className={style.link}>Home
          <div className={style.home_dropdown}>
             <Link to="/admin/adslider"><a>Ad Slider</a></Link>
            </div>
          </span>
        </Link>

        <Link className={style.link} to="/admin/about">
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
        </Link>

        <Link to="/admin/galery">
          <span className={style.link}>
            Gallery
          </span>
        </Link>

        <Link to="/admin/blog">
          <span className={style.link}>Blog
          <div className={style.home_dropdown}>
             <Link to="/admin/adblog"><a>Ad Blog</a></Link>
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
          <span onClick={()=>{
            localStorage.removeItem('admintoken');
          }} className={style.link}><ArrowBackIosIcon/>User</span>
        </Link>
      </ul>

      <ul className={style.hamburger}>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <MenuIcon
              style={{ color: "white" }}
              onClick={toggleDrawer(anchor, true)}
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
