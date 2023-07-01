import React from "react";
import ChooseUser from "./Choose.section";
import HomeGlobalSection from "./Home.section";
import TeamUser from "./ourTeam";
import PassionUser from "./Passion";
import { Helmet } from "react-helmet";
import BackToTopButton from "../Home/BackToTopButton";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../../components/USER/Navbar";
import FollowerUser from "../FollowerInstagram";
import FooterUser from "../../../components/USER/Footer";
import { FadingBalls } from "react-cssfx-loading";

const About = () => {
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
        <title>About</title>
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
          <PassionUser />
          <ChooseUser />
          <TeamUser />
          <BackToTopButton />
          <FollowerUser />
          <FooterUser />
        </>
      )}
    </div>
  );
};

export default About;
