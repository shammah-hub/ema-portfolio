import { About } from "./components/portfolio/About";
import { Contact } from "./components/portfolio/Contact";
import { Experience } from "./components/portfolio/Experience";
import { Faq } from "./components/portfolio/Faq";
import { Hero } from "./components/portfolio/Hero";
import { Nav } from "./components/portfolio/Nav";
import { Process } from "./components/portfolio/Process";
import { personLd } from "./components/portfolio/seo";
import { Services } from "./components/portfolio/Services";
import { Toolbox } from "./components/portfolio/Toolbox";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Toolbox />
        <Experience />
        <About />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
