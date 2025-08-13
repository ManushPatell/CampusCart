import Hero from "../components/Hero";
import Content from "../components/Content";
import Houses from "../components/Houses";
import TopBar from "../components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="scroll-smooth">
        <Hero />
        <section
          id="content-section"
          className="min-h-screen border-e-gray-950 bg-[#F5F1EA] p-8"
        >
          <Content />
        </section>
      </div>
    </>
  );
}
