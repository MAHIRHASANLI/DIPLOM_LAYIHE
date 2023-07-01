import React from "react";
import HomeGlobalSection from "./homesection";
import GalleryUser from "./gallery";
import { Helmet } from "react-helmet";
import BackToTopButton from "../Home/BackToTopButton";
import { useEffect } from "react";
import { useState } from "react";
import FooterUser from "../../../components/USER/Footer";
import FollowerUser from "../FollowerInstagram";
import Navbar from "../../../components/USER/Navbar";
import { FadingBalls } from "react-cssfx-loading";

const Galery = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading">
          <FadingBalls key="key" />
        </div>
      ) : (
        <>
          <Navbar />
          <HomeGlobalSection />
          <GalleryUser />
          <BackToTopButton />
          <FollowerUser />
          <FooterUser />
        </>
      )}
    </div>
  );
};

export default Galery;
