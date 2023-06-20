import React from "react";
import ChooseUser from "./Choose.section";
import HomeGlobalSection from "./Home.section";
import TeamUser from "./ourTeam";
import PassionUser from "./Passion";

const About = () => {
  return (
    <>
      <HomeGlobalSection />
      <PassionUser />
      <ChooseUser />
      <TeamUser />
    </>
  );
};

export default About;
