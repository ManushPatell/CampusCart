import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/aboutcard";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-bg text-primary-fg">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-extrabold text-[#4A4032] sm:text-5xl">
          About CampusCart
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-secondary-fg">
          CampusCart helps students discover, compare, and secure off-campus housing
          with less hassle. We streamline the process with verified listings, smart filters,
          and clear communication between renters and landlords. We also allow students
          to buy and sell their textbooks and other miscellaneous items, creating a trusted
          marketplace that makes student life easier and more affordable.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/houses"
            className="bg-[#4A4032] text-white px-5 py-2 rounded-lg shadow hover:bg-[#5C503E] transition"
          >
            Browse listings
          </Link>
          <Link
            to="/contact"
            className="border border-[#4A4032] text-[#4A4032] px-5 py-2 rounded-lg hover:bg-[#F5F1EA] transition"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Founders */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[#4A4032] sm:text-3xl">Our Founders</h2>
        <p className="mt-2 max-w-2xl text-sm text-secondary-fg">
          Meet the team behind CampusCart.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FounderCard
            img="/founders/andrew.jpg"
            name="Andrew Mancini"
            role="Software Engineer"
            bio="Andrew is a Computer Science student at the University of Waterloo (formerly McMaster University) with a professional focus on software engineering and system architecture. He has worked on projects that include full-stack development and hardware-software integration."
            linkedin="https://linkedin.com/in/andrew-iammancini"
          />
          <FounderCard
            img="/founders/brandon.jpg"
            name="Brandon Yoo"
            role="Biomedical Engineering & Computer Science"
            bio="Brandon is a Chemical-Biomedical Engineering and Biochemistry student at McMaster. He has worked in various software positions so far during his studies, namely as a Data Scientist and Machine Learning researcher. He has great passion for innovation in healthcare and the intersections between software and the biomedical sciences."
            linkedin="https://linkedin.com/in/brandonwsyoo"
          />
          <FounderCard
            img="/founders/manush.jpg"
            name="Manush Patel"
            role="Computer Engineering"
            bio="Manush is a Computer Engineering student at McMaster University, with a deep curiosity for electronics and software design. His primary work involves developing modern engineering workflows, but he also has great interest in other fields such as machine learning and hardware development."
            linkedin="https://linkedin.com/in/manushp"
          />
        </ul>
      </section>
    </main>
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
      <Card className="bg-white border border-[#E8DFD0] rounded-lg shadow hover:shadow-md transition">
        <CardContent>
          <div className="flex items-start gap-4">
            <img
              src={img}
              alt={name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-[#4A4032]">{name}</h3>
              <p className="text-sm text-secondary-fg">{role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-secondary-fg leading-relaxed">{bio}</p>
          <div className="mt-5 flex gap-2">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5 text-[#4A4032] hover:text-[#5C503E]" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
