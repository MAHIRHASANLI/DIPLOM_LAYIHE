import React from "react";
import Slider from "./Slider";
import GalleryUser from "../Galery/gallery";
import { Helmet } from "react-helmet";
import BackToTopButton from "./BackToTopButton";
// Worse way
import { FadingBalls } from "react-cssfx-loading";
import FollowerUser from "../FollowerInstagram";
import FooterUser from "../../../components/USER/Footer";
import Navbar from "../../../components/USER/Navbar";
import { useGlobalData } from "../../../global";

const Home = () => {
  const [a,b,c,d,loading ] = useGlobalData();
  console.log(a,b,c,d);
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading">
          <FadingBalls key="key" />
        </div>
      ) : (
        <>
          <Navbar />
          <Slider />
          <GalleryUser />
          <BackToTopButton />
          <FollowerUser />
          <FooterUser />
        </>
      )}
    </div>
  );
};

export default Home;
