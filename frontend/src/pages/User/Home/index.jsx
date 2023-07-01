import React from "react";
import Slider from "./Slider";
import GalleryUser from "../Galery/gallery";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Slider />
      <GalleryUser />
    </div>
  );
};

export default Home;
