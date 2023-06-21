import React, { useEffect } from "react";
import {  NavLink } from "react-router-dom";
import style from "./index.module.css";
import { useState } from "react";
import { GetAllHomeAbout } from "../../../../api/home.about.requests";

const HomeGlobalSection = () => {
  const [homeImg, setHomeImg] = useState([]);
  useEffect(() => {
    GetAllHomeAbout().then((res) => setHomeImg(res));
  }, []);
  return (
    <div className={style.HomeImg}>
      <div className={style.HomeImg_content}>
        <h2 className={style.context_h2}>Latest Blog</h2>
        <ol className={style.context}>
            <NavLink to="/">
             <li className={style.home}>
             <i
                style={{ fontSize: "16px", margin: "0" }}
                className="fa-solid fa-house-chimney icons"
              ></i>{" "}
              Home
             </li>
            </NavLink>
          <li className={style.about}>
            <i
              style={{ fontSize: "12px", margin: "0", color:"white" }}
              className="fa-solid fa-chevron-right"
            ></i>&nbsp;
            Blog
          </li>
        </ol>
      </div>

      {homeImg &&
        homeImg.map((item) => {
          return (
            <img
              key={item._id}
              className={style.HomeImg_item}
              src={item.url}
              alt="#"
            />
          );
        })}
    </div>
  );
};

export default HomeGlobalSection;
