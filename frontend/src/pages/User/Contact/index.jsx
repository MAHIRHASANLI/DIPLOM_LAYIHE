import React from "react";
import HomeGlobalSection from "./homesection";
import ContactUser from "./home";
import { Helmet } from "react-helmet";
import MessageUser from "./message";
import BackToTopButton from "../Home/BackToTopButton";
import { useEffect } from "react";
import { useState } from "react";
import { FadingBalls } from "react-cssfx-loading";
import FooterUser from "../../../components/USER/Footer";
import FollowerUser from "../FollowerInstagram";
import Navbar from "../../../components/USER/Navbar";

const Contact = () => {
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
        <title>Contact</title>
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
          <ContactUser />
          <MessageUser />
          <BackToTopButton />
          <FollowerUser />
          <FooterUser />
        </>
      )}
    </div>
  );
};

export default Contact;
