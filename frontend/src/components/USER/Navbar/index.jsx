import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GetAllLogoFooter } from "../../../api/logo.footer.requests";
import { useUserContext } from "../../../global";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

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

  //logAut
  // function hanldeLogOut() {
  //   if (window.confirm("Log out User ?")) {
  //     setUser(null);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //   }
  // }
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
        <a role="button" className={style.icons}>
          <SearchIcon />
        </a>
        {user ? (
          <NavLink to="fawori">
            <li title="< Faworites" className={style.username} >
              {user?.username}&nbsp;&nbsp; <AccountCircleIcon />
            </li>
          </NavLink>
        ) : (
          <NavLink to="/login/user">
          <li title="< Log In" className={style.username} >
            Log in&nbsp;&nbsp; <SensorOccupiedIcon />
          </li>
        </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
