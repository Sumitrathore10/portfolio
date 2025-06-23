import React from "react";
import Nav from "./components/nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import Project from "./components/project.jsx";
import HackathonJourney from "./components/Hackathon.jsx";
import Contact from "./components/Contact.jsx";




const App = () => {
  return (
    <div className="w-full flex-col flex h-fit bg-gradient-to-br from-[#f8fafafd] via-[#fdfdfdc6] to-[#e4ebf5] text-black">
      <Nav />
      <Hero />
      <About />
      <Service/>
      <Project />
      <HackathonJourney />
      <Contact />
      {/* <Demo /> */}
    </div>
  );
};

export default App;
