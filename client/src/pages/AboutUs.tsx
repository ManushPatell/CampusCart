import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/aboutcard";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-bg text-primary-fg">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A4032]">
              About CampusCart
            </h1>
            <p className="mt-4 text-base md:text-lg text-secondary-fg leading-relaxed max-w-prose">
              CampusCart helps students discover, compare, and secure off-campus
              housing with less hassle. We streamline rentals with verified
              listings, smart filters, and clear renter–landlord messaging.
              Students can also buy and sell textbooks and essentials in a
              trusted campus marketplace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/rentals"
                className="bg-[#4A4032] text-white px-5 py-2.5 rounded-xl shadow hover:bg-[#5C503E] transition font-semibold"
              >
                Browse listings
              </Link>
              <Link
                to="/contact"
                className="border border-[#4A4032] text-[#4A4032] px-5 py-2.5 rounded-xl hover:bg-[#F5F1EA] transition font-semibold"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <img
            src="/campuscart.png"
            alt="CampusCart — student housing and marketplace"
            className="w-full h-[240px] md:h-[300px] object-cover rounded-2xl shadow"
          />
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid gap-5 md:grid-cols-3">
          <ValueCard
            title="Verified & Transparent"
            body="Listings are vetted and clearly presented so students can make confident decisions."
          />
          <ValueCard
            title="Built for Students"
            body="Filters, watchlists, and messaging tuned to campus life and student budgets."
          />
          <ValueCard
            title="Beyond Housing"
            body="A trusted marketplace for textbooks and essentials to make student life easier."
          />
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

        <ul className="grid gap-6">
          <FounderCard
            img="/founders/andrew.jpg"
            name="Andrew Mancini"
            role="Software Engineer"
            bio="Andrew is a Computer Science student at the University of Waterloo (formerly McMaster University) with a focus on software engineering and system architecture, spanning full-stack work and hardware–software integration."
            linkedin="https://linkedin.com/in/andrew-iammancini"
          />

          <FounderCard
            img="/founders/brandon.jpg"
            name="Brandon Yoo"
            role="Biomedical Engineering & Computer Science"
            bio="Brandon studies Chemical-Biomedical Engineering and Biochemistry at McMaster. He has experience as a Data Scientist and ML researcher, with a passion for innovation at the intersection of software and biomedical sciences."
            linkedin="https://linkedin.com/in/brandonwsyoo"
          />

          <FounderCard
            img="/founders/manush.jpg"
            name="Manush Patel"
            role="Computer Engineering"
            bio="Manush is a Computer Engineering student at McMaster University with deep curiosity for electronics and software design. He builds modern engineering workflows and explores ML and hardware development."
            linkedin="https://linkedin.com/in/manushp"
          />
        </ul>
      </section>
    </main>
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

function FounderCard({
  img,
  name,
  role,
  bio,
  linkedin,
}: {
  img: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
}) {
  return (
    <li>
      <Card className="bg-white border border-[#E8DFD0] rounded-2xl shadow-sm hover:shadow-md transition">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              src={img}
              alt={name}
              className="w-full sm:w-44 h-32 rounded-xl object-cover object-center"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#4A4032]">
                    {name}
                  </h3>
                  <p className="text-sm text-secondary-fg">{role}</p>
                </div>

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center justify-center rounded-lg p-2 hover:bg-[#F5F1EA]"
                    aria-label={`LinkedIn profile of ${name}`}
                  >
                    <Linkedin className="h-5 w-5 text-[#4A4032] hover:text-[#5C503E]" />
                  </a>
                )}
              </div>

              <p className="mt-3 text-sm text-secondary-fg leading-relaxed">
                {bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
