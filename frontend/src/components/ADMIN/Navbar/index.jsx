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
        <li
          className={style.hamburger_menu}
          style={{ display: "block", margin: "10px 30px" }}
        >
          <Link style={{ color: "black" }} to="/admin/about">
            - About
          </Link>
          <div className={style.hamburger_dropdown}>
            <Link to="/admin/passion">
              <span>- Passion</span>
            </Link>
            <Link to="/admin/choose">
              <span>- Choose</span>
            </Link>
            <Link to="/admin/team">
              <span>- our Team</span>
            </Link>
            <Link to="/admin/about">
              <span>- Goo Back</span>
            </Link>
          </div>
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
          <NavLink style={{ color: "rgb(252,96,96)" }} to="/">
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
        <span className={style.link}>
          <Link to="/admin/home">Home</Link>
          <div className={style.home_dropdown}>
            <Link to="/admin/adslider">
              <span>Ad Slider</span>
            </Link>
          </div>
        </span>

        <div className={style.link}>
          <Link className={style.link} to="/admin/about">
            About
          </Link>
          <div className={style.home_dropdown}>
            <Link to="/admin/passion">
              <span>- Passion</span>
            </Link>
            <Link to="/admin/choose">
              <span>- Choose</span>
            </Link>
            <Link to="/admin/team">
              <span>- our Team</span>
            </Link>
          </div>
        </div>
        <Link to="/admin/galery">
          <span className={style.link}>Gallery</span>
        </Link>

        <span className={style.link}>
          <NavLink to="/admin/blog">Blog</NavLink>
          <div className={style.home_dropdown}>
            <NavLink to="/admin/adblog"><span>Ad Blog</span></NavLink>
          </div>
        </span>

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
          <span
            onClick={() => {
              localStorage.removeItem("admintoken");
            }}
            className={style.link}
          >
            <ArrowBackIosIcon />
            User
          </span>
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
