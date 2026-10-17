import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Arenas from "@/components/Arenas";
import Timeline from "@/components/Timeline";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { EVENT_DATE, arenas, contact, faqs } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: "Cypher ’27 · Gaming Zone",
      startDate: EVENT_DATE,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "Sri Sumangala College", address: contact.address },
      organizer: { "@type": "Organization", name: "Sri Sumangala College ICT Society", email: contact.email },
      description: `Inter-school and intra-school competitions: ${arenas.map((a) => a.name).join(", ")}.`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Arenas />
        <Timeline />
        <About />
        <Projects />
        <Team />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
