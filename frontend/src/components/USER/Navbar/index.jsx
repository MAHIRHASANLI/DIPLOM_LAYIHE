import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GetAllLogoFooter } from "../../../api/logo.footer.requests";
import { useUserContext } from "../../../global";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [user] = useUserContext();
  const [logo, setLogo] = useState([]);
  useEffect(() => {
    GetAllLogoFooter().then((res) => {
      setLogo(res);
    });
  }, []);

  const [navSize, setnavSize] = useState("75px");
  const [navColor, setnavColor] = useState("rgba(0, 0, 0, 0.2)");
  const listenScrollEvent = () => {
    window.scrollY > 10
      ? setnavColor("rgb(0,0,0)")
      : setnavColor("rgba(0, 0, 0, 0.2)");
    window.scrollY > 10 ? setnavSize("70px") : setnavSize("75px");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 130 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <li style={{ display: "block", margin: "80px 30px 0" }}>
          <NavLink style={{ color: "black" }} to="/">
            - Home
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/about">
            - About
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink
            className={style.hamburger_menu}
            style={{ color: "black" }}
            to="/gallery"
          >
            - Gallery
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/blog">
            - Blog
          </NavLink>
        </li>
        <li style={{ display: "block", margin: "10px 30px" }}>
          <NavLink style={{ color: "black" }} to="/contact">
            - Contact
          </NavLink>
        </li>
      </List>
    </Box>
  );

  return (
    <nav
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
        zIndex: "9999",
      }}
    >
      <div className={style.navbar}>
        {logo &&
          logo.map((item) => (
            <img
              key={item._id}
              style={{ width: "82px", height: "22px" }}
              src={item.url}
              alt="Alime."
            />
          ))}

        <ul className="navbar_nav">
          <NavLink className={style.navbar_nav_link} to="/">
            Home
          </NavLink>
          <NavLink className={style.navbar_nav_link} to="/about">
            About
          </NavLink>
          <NavLink className={style.navbar_nav_link} to="/galery">
            Gallery
          </NavLink>
          <NavLink className={style.navbar_nav_link} to="/blog">
            Blog
          </NavLink>
          <NavLink className={style.navbar_nav_link} to="/contact">
            Contact
          </NavLink>
        </ul>
        <li className={style.icons}>
          <SearchIcon />
        </li>
        {user ? (
          <li title="< Faworites" className={style.username}>
            <NavLink to="/fawori">
              <span>{user?.username}&nbsp;&nbsp;<AccountCircleIcon style={{color:"rgb(252,96,96)"}}/></span> 
            </NavLink>
          </li>
        ) : (
          <NavLink to="/login/user">
            <li title="< Log In" className={style.username}>
              Log in&nbsp;&nbsp; <SensorOccupiedIcon style={{color:"rgb(252,96,96)"}}/>
            </li>
          </NavLink>
        )}
      </div>
      <ul className={style.hamburger}>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <MenuIcon
              style={{ color: "white", fontSize: "40px" }}
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
    </nav>
  );
};

export default Navbar;
