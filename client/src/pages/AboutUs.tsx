import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/aboutcard";
import Nav from "../components/Nav";

export default function AboutUs() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg text-primary-fg">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A4032]">
                About CampusCart
              </h1>
              <p className="mt-4 text-base md:text-lg text-secondary-fg leading-relaxed max-w-prose">
                CampusCart helps students discover, compare, and secure
                off-campus housing with less hassle. We streamline rentals with
                verified listings, smart filters, and clear renter–landlord
                messaging. Students can also buy and sell textbooks and
                essentials in a trusted campus marketplace.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/rentals"
                  className="bg-[#4A4032] text-white px-5 py-2.5 rounded-xl shadow hover:bg-[#5C503E] transition font-semibold"
                >
                  Browse listings
                </Link>
                <a
                  href="mailto:campuscart10@gmail.com"
                  className="border border-[#4A4032] text-[#4A4032] px-5 py-2.5 rounded-xl hover:bg-[#F5F1EA] transition font-semibold"
                >
                  Get in touch
                </a>
              </div>
            </div>

            <img
              src="/campuscart.png"
              alt="CampusCart — student housing and marketplace"
              className="w-full h-[240px] md:h-[300px] object-cover rounded-2xl shadow"
            />
          </div>
        </section>

        {/* Why I Built CampusCart */}
        <section className="max-w-3xl mx-auto px-6 pt-16">
          <div className="bg-[#F5F1EA] border border-[#E8DFD0] rounded-2xl p-6 shadow-sm">
            <blockquote className="text-lg italic text-[#4A4032] leading-relaxed">
              "I spent months searching through Facebook Marketplace and
              Places4Students for a reasonable listing, but mostly found spam,
              scams, and bots. Not to mention sketchy concert ticket exchanges
              on Snapchat. I wanted a platform students could trust. That’s when
              the idea for CampusCart was born — a place for real listings from
              real students."
            </blockquote>
            <p className="mt-4 text-right font-semibold text-[#4A4032]">
              — Manush Patel
            </p>
          </div>
        </section>

        {/* Founders */}
        <section className="max-w-6xl mx-auto px-6 pb-20 pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#4A4032]">
            Our Founders
          </h2>
          <p className="mt-2 mb-8 max-w-prose text-sm text-secondary-fg">
            Meet the team behind CampusCart.
          </p>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {[
              {
                img: "/andrew-campuscart.jpg",
                name: "Andrew Iammancini",
                role: "Computer Science",
                bio: "Computer Science student with focus on full-stack systems and hardware–software integration.",
                linkedin: "https://linkedin.com/in/andrew-iammancini",
              },
              {
                img: "/manush-campuscart.jpg",
                name: "Manush Patel",
                role: "Computer Engineering",
                bio: "Explores modern workflows, ML, and hardware. Built CampusCart to make campus life easier.",
                linkedin: "https://linkedin.com/in/manushp",
              },
              {
                img: "/brandon-campuscart.jpg",
                name: "Brandon Yoo",
                role: "Biomedical Engineering & Computer Science",
                bio: "Data Scientist and ML researcher passionate about biomedicine and software innovation.",
                linkedin: "https://linkedin.com/in/brandonwsyoo",
              },
            ].map((f) => (
              <li key={f.name} className="h-full">
                <Card className="h-full flex flex-col bg-white border border-[#E8DFD0] rounded-2xl shadow-sm hover:shadow transition">
                  <CardContent className="flex-1 p-5 flex flex-col items-center text-center">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-28 h-28 rounded-full object-cover shadow mb-4"
                    />
                    <h3 className="text-lg font-semibold text-[#4A4032]">
                      {f.name}
                    </h3>
                    <p className="text-sm text-secondary-fg">{f.role}</p>
                    <p className="mt-2 text-sm text-secondary-fg">{f.bio}</p>
                    {f.linkedin && (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center justify-center rounded-lg p-2 hover:bg-[#F5F1EA]"
                        aria-label={`LinkedIn profile of ${f.name}`}
                      >
                        <Linkedin className="h-5 w-5 text-[#4A4032] hover:text-[#5C503E]" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

/* ------------ Small Components ------------ */

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="bg-white border border-[#E8DFD0] rounded-2xl shadow-sm hover:shadow transition">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold text-[#4A4032]">{title}</h3>
        <p className="mt-2 text-sm text-secondary-fg leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}
