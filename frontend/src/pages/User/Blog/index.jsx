import React from "react";
import HomeGlobalSection from "./homesection";
import BlogUser from "./blog";
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <HomeGlobalSection />
      <BlogUser />
    </div>
  );
};

export default Blog;
