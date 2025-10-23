import { useAuth } from "../context/AuthContext";
import {
  House,
  LibraryBig,
  ShoppingBasket,
  Plus,
  MapPin,
  Banknote,
  BedDouble,
  Calendar,
  GraduationCap,
  BookOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import useUserRentals from "../hooks/useUserRentals";
import useUserTextbooks from "../hooks/useUserTextbooks";
import useUserMisc from "../hooks/useUserMisc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShareButton from "@/components/Share";

function CardImage({ src, alt }: { src?: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  const show = !!src && !broken;

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-border bg-border/30`}
    >
      {show ? (
        <div className="h-[60vh] w-full">
          <img
            src={src}
            alt={alt}
            onError={() => setBroken(true)}
            className="h-full w-full object-contain object-center rounded-md"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center text-secondary-fg/70 text-sm p-4">
          No photo
        </div>
      )}
    </div>
  );
}

function ActionButtons({
  onEdit,
  onDelete,
  shareTitle,
  text,
  url,
}: {
  onEdit: () => void;
  onDelete: () => void;
  shareTitle: string;
  text: string;
  url: string;
}) {
  return (
    <div className="mt-3 flex flex-col sm:flex sm:flex-row sm:items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-blue-600 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 transition"
      >
        <Pencil className="h-5 w-5" />
        Edit
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm
                   text-red-700 bg-red-100 hover:bg-red-200 active:bg-red-300 transition"
      >
        <Trash2 className="h-5 w-5" />
        Delete
      </button>
      <ShareButton title={shareTitle} text={text} url={url} />
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoading: loading } = useAuth();
  const navigate = useNavigate();
  const { userRentals, isUserRentalsLoading } = useUserRentals();
  const { userTextbooks, isUserTextbooksLoading } = useUserTextbooks();
  const { userMisc, isUserMiscLoading } = useUserMisc();

  if (loading)
    return <div className="px-8 py-12 text-secondary-fg">Loading…</div>;
  if (user === null)
    return (
      <div className="px-8 py-12 text-secondary-fg">
        You are not currently logged in.
      </div>
    );

  async function del(path: string) {
    const ok = window.confirm("Delete this listing? This cannot be undone.");
    if (!ok) return;
    try {
      const res = await fetch(path, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Please try again.");
    }
  }
  const deleteRental = (id: string) =>
    del(`${import.meta.env.VITE_API_URL}/rentals/${id}`);
  const deleteTextbook = (id: string) =>
    del(`${import.meta.env.VITE_API_URL}/textbooks/${id}`);
  const deleteMisc = (id: string) =>
    del(`${import.meta.env.VITE_API_URL}/misc/${id}`);

  const FlatStat = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value?: number;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="w-full rounded-xl border-2 border-border bg-primary-bg shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondary-fg/80">
            {label}
          </p>
          <div className="text-4xl font-extrabold text-primary-fg">
            {value ?? 0}
          </div>
        </div>
        <div className="rounded-lg p-3 bg-border/40 text-primary-fg">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  const Section = ({
    title,
    onAdd,
    children,
  }: {
    title: string;
    onAdd: () => void;
    children: React.ReactNode;
  }) => (
    <div className="rounded-xl border-2 border-border bg-primary-bg shadow-lg w-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/70">
        <p className="text-primary-fg font-semibold text-xl">{title}</p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 bg-primary-fg text-primary-bg text-sm hover:bg-primary-fg/85 transition"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="text-xs px-2 py-1 rounded-full bg-border/50 text-secondary-fg">
      {children}
    </span>
  );

  const Row = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`rounded-lg border border-border bg-primary-bg p-4 shadow-sm hover:shadow-md transition`}
    >
      {children}
    </div>
  );

  return (
    <div className="px-6 sm:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-primary-fg mt-[5rem]">
          Dashboard
        </h1>
        <p className="text-base text-secondary-fg mt-1">
          Welcome <span className="font-semibold">{user.firstName}</span> —
          manage your listings or add new ones below.
        </p>
      </div>

      {/* Stats (flat) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FlatStat label="Rentals" value={userRentals?.length} icon={House} />
        <FlatStat
          label="Textbooks"
          value={userTextbooks?.length}
          icon={LibraryBig}
        />
        <FlatStat
          label="Miscellaneous"
          value={userMisc?.length}
          icon={ShoppingBasket}
        />
      </div>

      {/* Rentals */}
      <Section
        title="Rental listings"
        onAdd={() => navigate("/rentals/create")}
      >
        {isUserRentalsLoading ? (
          <div className="text-secondary-fg">Loading…</div>
        ) : userRentals && userRentals.length > 0 ? (
          <div className="flex flex-col gap-3">
            {userRentals.map((rental) => (
              <Row key={rental.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* LEFT: Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary-fg">
                      <MapPin className="h-6 w-6 opacity-70" />
                      <span className="font-semibold text-lg">
                        {rental.title}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-secondary-fg">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Banknote className="h-6 w-6 opacity-70" /> $
                        {rental.cost}
                      </span>
                      <Chip>
                        {rental.is_cost_per_room ? "per room" : "total"}
                      </Chip>
                      {rental.house_type ? (
                        <Chip>{rental.house_type}</Chip>
                      ) : null}
                      {rental.num_beds ? (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <BedDouble className="h-6 w-6 opacity-70" />{" "}
                          {rental.num_beds} bed(s)
                        </span>
                      ) : null}
                      {rental.is_utilities_included ? (
                        <Chip>Utilities</Chip>
                      ) : null}
                      {rental.has_parking ? <Chip>Parking</Chip> : null}
                      {rental.has_laundry ? <Chip>Laundry</Chip> : null}
                    </div>

                    <div className="text-xs text-secondary-fg">
                      {rental.post_date ? (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-5 w-5 opacity-70" />
                          {String(rental.post_date.split("T")[0])}
                        </span>
                      ) : null}
                    </div>

                    {/* Actions */}
                    <ActionButtons
                      onEdit={() => navigate(`/rentals/create?id=${rental.id}`)}
                      onDelete={() => deleteRental(String(rental.id))}
                      shareTitle={rental.address}
                      text="Check out this listing on Campus Cart!"
                      url={`/rentals/${rental.id}`}
                    />
                  </div>

                  {/* RIGHT: Photo (first photo) */}
                  <CardImage src={rental.photos?.[0]} alt="rental image" />
                </div>
              </Row>
            ))}
          </div>
        ) : (
          <div className="text-secondary-fg text-sm">No rental listings.</div>
        )}
      </Section>

      {/* Textbooks */}
      <Section
        title="Textbook listings"
        onAdd={() => navigate("/textbooks/create")}
      >
        {isUserTextbooksLoading ? (
          <div className="text-secondary-fg">Loading…</div>
        ) : userTextbooks && userTextbooks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {userTextbooks.map((t) => (
              <Row key={t.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* LEFT: Details */}
                  <div className="space-y-2">
                    <div className="text-primary-fg font-semibold text-lg">
                      {t.book_title}
                    </div>
                    <div className="text-secondary-fg text-base">
                      by {t.author}
                    </div>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Banknote className="h-6 w-6 opacity-70" /> $
                      {t.price}
                    </span>

                    <div className="flex flex-wrap gap-2 text-secondary-fg text-xs">
                      {t.edition ? (
                        <Chip>
                          <BookOpen className="h-5 w-5 inline-block mr-1" />
                          Edition {t.edition}
                        </Chip>
                      ) : null}
                      {t.year ? (
                        <Chip>
                          <Calendar className="h-5 w-5 inline-block mr-1" />
                          {t.year}
                        </Chip>
                      ) : null}
                      {t.faculty ? (
                        <Chip>
                          <GraduationCap className="h-5 w-5 inline-block mr-1" />
                          {t.faculty}
                        </Chip>
                      ) : null}
                      {t.condition ? <Chip>{t.condition}</Chip> : null}
                    </div>

                    {/* Actions */}
                    <ActionButtons
                      onEdit={() => navigate(`/textbooks/create?id=${t.id}`)}
                      onDelete={() => deleteTextbook(t.id)}
                      shareTitle={t.book_title}
                      text="Check out this listing on Campus Cart!"
                      url={`/textbooks/${t.id}`}
                    />
                  </div>

                  {/* RIGHT: Photo (first photo) */}
                  <CardImage src={t.photos?.[0]} alt="textbook image" />
                </div>
              </Row>
            ))}
          </div>
        ) : (
          <div className="text-secondary-fg text-sm">No textbook listings.</div>
        )}
      </Section>

      {/* Misc */}
      <Section
        title="Miscellaneous listings"
        onAdd={() => navigate("/misc/create")}
      >
        {isUserMiscLoading ? (
          <div className="text-secondary-fg">Loading…</div>
        ) : userMisc && userMisc.length > 0 ? (
          <div className="flex flex-col gap-3">
            {userMisc.map((m) => (
              <Row key={m.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* LEFT: Details */}
                  <div className="space-y-2">
                    <div className="text-primary-fg font-semibold text-lg">
                      {m.title}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-secondary-fg">
                      {typeof (m as any).price !== "undefined" ? (
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Banknote className="h-6 w-6 opacity-70" /> $
                          {(m as any).price}
                        </span>
                      ) : null}
                      {(m as any).listing_type ? (
                        <Chip>{(m as any).listing_type}</Chip>
                      ) : null}
                    </div>

                    {/* Actions */}
                    <ActionButtons
                      onEdit={() => navigate(`/misc/create?id=${m.id}`)}
                      onDelete={() => deleteMisc(m.id)}
                      shareTitle={m.title}
                      text="Check out this listing on Campus Cart!"
                      url={`/misc/${m.id}`}
                    />
                  </div>

                  {/* RIGHT: Photo (first photo) */}
                  <CardImage
                    src={(m as any).photos?.[0]}
                    alt={`${m.title} preview`}
                  />
                </div>
              </Row>
            ))}
          </div>
        ) : (
          <div className="text-secondary-fg text-sm">
            No miscellaneous listings.
          </div>
        )}
      </Section>
    </div>
  );
}
