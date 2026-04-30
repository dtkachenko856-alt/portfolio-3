import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkHistory from "@/components/WorkHistory";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <WorkHistory />
      <Education />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
