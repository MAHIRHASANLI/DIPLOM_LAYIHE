import React from "react";
import HomeGlobalSection from "./homesection";
import ContactUser from "./home";
import { Helmet } from "react-helmet";
import MessageUser from "./message";

const Contact = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <HomeGlobalSection/>
      <ContactUser/>
      <MessageUser/>
    </div>
  );
};

export default Contact;
