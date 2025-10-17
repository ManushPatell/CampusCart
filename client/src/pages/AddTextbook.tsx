import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useState, useEffect, useRef } from "react";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { BookImage } from "lucide-react";

const faculties = Object.freeze([
  "Engineering",
  "Science",
  "Social Science",
  "Health Science",
  "Humanities",
  "Business",
  "Arts & Science",
]);
type Faculty = (typeof faculties)[number];

const conditions = Object.freeze(["Used", "New"]);
type Condition = (typeof conditions)[number];

type FormInputs = {
  book_title: string;
  author: string;
  edition: string;
  year: number | null;
  faculty: Faculty;
  price: number | "";
  condition: Condition;
  // photos are added on submit
};

const initialValues: FormInputs = {
  book_title: "",
  author: "",
  edition: "",
  year: NaN,
  faculty: "",
  price: "",
  condition: "",
};

const MAX_IMAGES = 10;
function formatMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function AddTextbook() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTextbook, setIsLoadingTextbook] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemImages, setItemImages] = useState<(string | File)[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: FormInputs) => {
    setIsLoading(true);
    setErrorMessage("");

    const uploadedUrls: string[] = itemImages.filter(
      (image) => typeof image === "string",
    );
    try {
      for (const file of itemImages.filter((item) => item instanceof File)) {
        const imageForm = new FormData();
        imageForm.append("image", file);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: "POST",
          body: imageForm,
          credentials: "include",
        });

        if (!res.ok) throw new Error("Image upload failed");

        const data = await res.json();
        uploadedUrls.push(data.url);
        console.log("Submitting photos:", uploadedUrls); // should be string[]
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("One or more images failed to upload.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/textbooks/${id}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...formData, photos: uploadedUrls }),
        },
      );

      if (!res.ok) {
        if (res.status === 500) {
          setErrorMessage("Something went wrong on our end! Please try again.");
        } else {
          const body = await res.json().catch(() => ({}));
          setErrorMessage(body?.error || "Failed to create textbook listing.");
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["userTextbooks"] });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error while creating textbook.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoadingTextbook(true);
      fetch(`${import.meta.env.VITE_API_URL}/textbooks/${id}`)
        .then((res) => res.json())
        .then((body) => {
          setIsLoadingTextbook(false);
          setItemImages(body.photos);
          reset({
            book_title: body.book_title,
            author: body.author,
            edition: body.edition,
            year: parseInt(body.year),
            faculty: body.faculty,
            price: parseInt(body.price),
            condition: body.condition,
          });
        });
    }
  }, []);

  return (
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg mt-[5rem]">
      <div className="text-sm text-gray-500 mb-3">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        / <span className="text-gray-700">Textbook</span>
      </div>

      <h1 className="text-xl font-bold">{id ? "Edit" : "Add"} textbook</h1>
      <form
        className="flex flex-col gap-[.5rem] my-[2rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="book_title"
          control={control}
          errors={errors}
          placeholder="Book title"
          rules={{ required: "Field required" }}
        />
        <ControlledInput
          name="price"
          control={control}
          errors={errors}
          placeholder="Price"
          rules={{
            required: "Field required",
            validate: (value) => !isNaN(value as number) || "Must be a number",
          }}
        />
        <ControlledInput
          name="author"
          control={control}
          errors={errors}
          placeholder="Author"
          rules={{ required: "Field required" }}
        />
        <ControlledInput
          control={control}
          name="edition"
          errors={errors}
          placeholder="Book edition"
        />
        <ControlledDropdown
          name="condition"
          placeholder="Book condition"
          optionsLabel="Types"
          control={control}
          errors={errors}
          options={conditions as string[]}
          rules={{ required: "Field required" }}
        />
        <ControlledDropdown
          name="faculty"
          placeholder="Faculty"
          optionsLabel="Faculties"
          control={control}
          errors={errors}
          options={faculties as string[]}
          rules={{ required: "Field required" }}
        />
        <ControlledDropdown
          name="year"
          placeholder="Year of study"
          optionsLabel="Year options"
          control={control}
          errors={errors}
          options={[1, 2, 3, 4]}
          rules={{ required: "Field required" }}
        />

        {/* ---------- Image Uploader (same look/feel as other pages) ---------- */}
        <label className="font-semibold text-primary-fg mt-4 mb-2 block">
          Images
        </label>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files || []).filter((f) =>
              f.type.startsWith("image/"),
            );
            if (!files.length) return;
            setItemImages((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
          }}
          className="rounded-2xl border-2 border-dashed border-zinc-300 bg-white/60 
                     hover:border-zinc-400 transition-colors p-6 text-center cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 text-zinc-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 15v4H5v-4H3v6h18v-6zM11 3v10.17l-3.59-3.58L6 11l6 6 6-6-1.41-1.41L13 13.17V3z" />
            </svg>
            <p className="text-sm">
              Drag & drop images here, or{" "}
              <span className="underline">browse</span>
            </p>
            <p className="text-xs text-zinc-500">
              PNG/JPG · up to {MAX_IMAGES} files
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (!e.target.files) return;
              const files = Array.from(e.target.files);
              setItemImages((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          />
        </div>

        <div className="mt-3 mb-2 flex items-center justify-between text-sm text-zinc-600">
          <span>
            {itemImages.length}/{MAX_IMAGES} selected
          </span>
          <button
            type="button"
            onClick={() => setItemImages([])}
            className="underline hover:opacity-80"
          >
            Remove all
          </button>
        </div>

        {
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {itemImages.map((image, index) => {
              const url =
                image instanceof File ? URL.createObjectURL(image) : image;
              return (
                <div
                  key={index}
                  className={`relative group rounded-xl border ${index === 0 ? "border-blue-600 border-2" : "border-zinc-200"} bg-white overflow-hidden shadow-sm`}
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setItemImages((prev) => {
                        return prev.filter((_, i) => i != index);
                      });
                    }}
                    className="absolute top-2 right-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs px-2 py-0.5
                            "
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ✕
                  </button>
                  {/* make cover */}
                  <button
                    type="button"
                    onClick={() => {
                      setItemImages((prev) => {
                        return [
                          prev.find((img) => img === image)!,
                          ...prev.filter((_, i) => i != index),
                        ];
                      });
                    }}
                    className={`absolute top-2 right-10 rounded-full text-xs px-2 py-0.5 w-6 flex items-center justify-center ${index === 0 ? "bg-blue-600 text-white hover:bg-blue-800" : "bg-black/60 hover:bg-black/80 text-white"}`}
                    aria-label={`Make image ${index + 1} cover image`}
                  >
                    <BookImage className="h-[.9rem] w-[.9rem] mx-[-.1rem] text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        }
        <p className="text-red-500 text-[1rem]">{errorMessage}</p>
        <Submit
          label={`${id ? "Edit" : "Add"} textbook`}
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
