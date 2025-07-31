import { useAuth } from "../context/AuthContext";
import { House, LibraryBig, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserRentals from "../hooks/useUserRentals";
import useUserTextbooks from "../hooks/useUserTextbooks";
import useUserMisc from "../hooks/useUserMisc";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { userRentals, isUserRentalsLoading } = useUserRentals();
  const { userTextbooks, isUserTextbooksLoading } = useUserTextbooks();
  const { userMisc, isUserMiscLoading } = useUserMisc();

  if (loading) return <p>Loading...</p>;

  if (user === null) return <p>You are not currently logged in.</p>;

  const headingBoxContainerClassName =
    "border-primary-fg border-1 shadow-xl w-full rounded-md bg-primary-bg";
  const headingBoxClassName =
    "flex gap-[.75rem] py-[.4rem] px-[1rem] items-center text-secondary-fg text-md justify-between";
  const amountClassName =
    "font-bold text-2xl px-[1rem] pb-[.4rem] min-w-[10rem]";

  return (
    <div className="px-[2rem] py-[3rem]">
      <h1 className="text-2xl font-bold mb-[.5rem] text-primary-fg">
        Dashboard
      </h1>
      <p className="text-md mb-[1rem] text-secondary-fg">
        Welcome {user.firstName}! You can view current your current listings and
        post more items below.
      </p>
      <span className="flex justify-between gap-[.75rem] flex-wrap sm:flex-nowrap">
        <div className={headingBoxContainerClassName}>
          <span className={headingBoxClassName}>
            <p className="text-secondary-fg">Rentals</p>
            <House className="rounded-md bg-[#DFAF5E]/30 text-[#DFAF5E] p-[.3rem] h-[1.75rem] w-[1.75rem]" />
          </span>
          <h3 className={amountClassName}>{userRentals?.length}</h3>
        </div>
        <div className={headingBoxContainerClassName}>
          <span className={headingBoxClassName}>
            <p className="text-secondary-fg">Textbooks</p>
            <LibraryBig className="rounded-md bg-[#416914]/30 text-[#416914] p-[.3rem] h-[1.75rem] w-[1.75rem]" />
          </span>
          <h3 className={amountClassName}>{userTextbooks?.length}</h3>
        </div>
        <div className={headingBoxContainerClassName}>
          <span className={headingBoxClassName}>
            <p className="text-secondary-fg">Miscellaneous</p>
            <ShoppingBasket className="rounded-md bg-[#6D152B]/30 text-[#6D152B] p-[.3rem] h-[1.75rem] w-[1.75rem]" />
          </span>
          <h3 className={amountClassName}>{userMisc?.length}</h3>
        </div>
      </span>

      <div className="bg-primary-bg border-primary-fg border-1 rounded-md shadow-lg mt-[2rem] z-50 border-l-[#DFAF5E] border-l-3 px-[1rem] py-[.4rem]">
        <span className="flex justify-between">
          <p className="text-primary-fg">Rental listings</p>
          <button
            className="bg-primary-fg text-primary-bg rounded-md w-[1.5rem] h-[1.5rem] hover:bg-primary-fg/75"
            onClick={() => navigate("/rentals/create")}
          >
            +
          </button>
        </span>

        <span className="flex flex-col gap-[1rem]">
          {!isUserRentalsLoading
            ? userRentals?.map((rental) => (
                <span key={rental.id}>
                  <p>Address: {rental.address}</p>
                  <p>
                    ${rental.cost}{" "}
                    {rental.is_cost_per_room ? "per room" : "all together"}
                  </p>
                </span>
              ))
            : "No rental listings"}
        </span>
      </div>

      <div className="bg-primary-bg border-primary-fg border-1 rounded-md shadow-lg mt-[1rem] z-50 border-l-[#416914] border-l-3 px-[1rem] py-[.4rem]">
        <span className="flex justify-between">
          <p className="text-primary-fg">Textbook listings</p>
          <button
            className="bg-primary-fg text-primary-bg rounded-md w-[1.5rem] h-[1.5rem] hover:bg-primary-fg/75"
            onClick={() => navigate("/textbooks/create")}
          >
            +
          </button>
        </span>
        {!isUserTextbooksLoading ? (
          <span className="flex flex-col gap-[1rem]">
            {userTextbooks!.length > 0
              ? userTextbooks?.map((textbook) => (
                  <span key={textbook.id}>
                    <p>Title: {textbook.book_title}</p>
                    <p>Author: {textbook.author}</p>
                  </span>
                ))
              : "No textbook listings"}
          </span>
        ) : (
          "Loading..."
        )}
      </div>

      <div className="bg-primary-bg border-primary-fg border-1 rounded-md shadow-lg mt-[1rem] z-50 border-l-[#6D152B] border-l-3 px-[1rem] py-[.4rem]">
        <span className="flex justify-between">
          <p className="text-primary-fg">Miscellaneous listings</p>
          <button
            className="bg-primary-fg text-primary-bg rounded-md w-[1.5rem] h-[1.5rem] hover:bg-primary-fg/75"
            onClick={() => navigate("/misc/create")}
          >
            +
          </button>
        </span>

        {!isUserMiscLoading ? (
          <span className="flex flex-col gap-[1rem]">
            {userMisc!.length > 0
              ? userMisc?.map((misc) => <span key={misc.id}>Misc Stuff</span>)
              : "No miscellaneous listings"}
          </span>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
