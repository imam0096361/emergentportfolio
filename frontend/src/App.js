import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { CustomCursor, Scanlines, BootOverlay } from "./components/Overlays";
import HudNav from "./components/HudNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Systems from "./components/Systems";
import Stack from "./components/Stack";
import Timeline from "./components/Timeline";
import AutomateBD from "./components/AutomateBD";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Portfolio = () => {
  return (
    <div className="App relative">
      <BootOverlay />
      <CustomCursor />
      <Scanlines />
      <HudNav />
      <main className="relative">
        <Hero />
        <About />
        <Systems />
        <Stack />
        <Timeline />
        <AutomateBD />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
