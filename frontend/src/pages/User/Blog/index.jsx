import React from "react";
import HomeGlobalSection from "./homesection";
import BlogUser from "./blog";
import { Helmet } from "react-helmet";
import BackToTopButton from "../Home/BackToTopButton";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../components/USER/Navbar";
import FooterUser from "../../../components/USER/Footer";
import FollowerUser from "../FollowerInstagram";
import { FadingBalls } from "react-cssfx-loading";

const Blog = () => {
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
        <title>Blog</title>
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
          <BlogUser />
          <BackToTopButton />
          <FollowerUser />
          <FooterUser />
        </>
      )}
    </div>
  );
};

export default Blog;
