import { Link } from "react-router-dom";

const TextbookCard = ({ textbook }: { textbook: Textbook }) => {
  return (
    <div className="mb-4 break-inside-avoid rounded-lg shadow bg-primary-bg">
      <img
        src={textbook.photos?.[0] || "/placeholder-book.jpg"}
        alt={textbook.book_title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary-fg">
          {textbook.book_title}
        </h2>
        <p className="text-secondary-fg">Author: {textbook.author}</p>
        <p className="text-secondary-fg">Edition: {textbook.edition}</p>
        <p className="text-secondary-fg">Condition: {textbook.condition}</p>
        <p className="text-secondary-fg">Price: ${textbook.price}</p>

        <Link to={`/textbooks/${textbook.id}`}>
          <button className="mt-4 bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TextbookCard;
