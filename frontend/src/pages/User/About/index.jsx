import React from "react";
import ChooseUser from "./Choose.section";
import HomeGlobalSection from "./Home.section";
import TeamUser from "./ourTeam";
import PassionUser from "./Passion";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <HomeGlobalSection />
      <PassionUser />
      <ChooseUser />
      <TeamUser />
    </div>
  );
};

export default About;
