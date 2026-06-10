import NavBar from "./Components/NavBar";
import About from "./Section/About";
import Contact from "./Section/Contact";
import Experience from "./Section/Experience";
import Footer from "./Section/Footer";
import Home from "./Section/Home";
import Projects from "./Section/Projects";
import Skills from "./Section/Skills";
import CustomCursor from "./Components/CustomCursor";
import React from "react";
import IntroAnimation from "./Components/IntroAnimation";

export default function App() {
  const [introDone,setIntroDone]=React.useState(false);
  return(<>
    {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)}/>}
  
  
{introDone && (
    <div className="relative gradient text-white">
      <CustomCursor/>
      {/* <PaticlesBackground /> */}

      <NavBar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
    )}
    </>
  
  );
}