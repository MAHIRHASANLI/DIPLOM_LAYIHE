import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/USER/Navbar";
import FooterUser from "../../components/USER/Footer";
import FollowerUser from "./FollowerInstagram";

const MainRoot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FollowerUser/>
      <FooterUser />
    </>
  );
};

export default MainRoot;
