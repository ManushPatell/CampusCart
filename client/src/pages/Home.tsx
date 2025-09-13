import Hero from "../components/Hero";
import Content from "../components/Content";
import Houses from "../components/Houses";
import AccountPage from "./AccountPage";

export default function Home() {
  return (
    <>
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
