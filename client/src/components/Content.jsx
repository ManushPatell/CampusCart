import image from '../assets/stella.jpg';

const cards = [
  {
    title: "Why CampusCart?",
    text: "A student-to-student marketplace built for trust, savings, and style.",
    image: image,
    bg: "bg-rose-100",
  },
  {
    title: "What You Can Do",
    text: "Buy and sell listings made just for students — textbooks, housing, and more.",
    image: image,
    bg: "bg-green-100",
  },
  {
    title: "How to Get Started",
    text: "Sign up with your school email and join your campus community in seconds.",
    image: image,
    bg: "bg-sky-100",
  },
];

export default function Content() {
  return (
    <section className="px-6 py-12">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {cards.map((card, i) => (
          <div key={i} className={`rounded-xl shadow p-4 break-inside-avoid ${card.bg}`}>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-auto rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">{card.title}</h3>
            <p className="text-zinc-700 text-base">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
