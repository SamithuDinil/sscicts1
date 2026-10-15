import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Arenas from "@/components/Arenas";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Arenas />
        <About />
        <Projects />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
