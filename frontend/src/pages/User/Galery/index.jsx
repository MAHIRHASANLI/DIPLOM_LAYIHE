import React from "react";
import HomeGlobalSection from "./homesection";
import GalleryUser from "./gallery";
import { Helmet } from "react-helmet";

const Galery = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <HomeGlobalSection />
      <GalleryUser />
    </div>
  );
};

export default Galery;
