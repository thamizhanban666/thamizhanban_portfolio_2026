import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ColorPalettePicker from "@/components/ColorPalettePicker";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <FeaturedWork />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ColorPalettePicker />
      </Suspense>
    </>
  );
}
