import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useState, useEffect, useRef } from "react";
import ControlledCheckbox from "../components/forms/ControlledCheckbox";
import ControlledDatePicker from "@/components/forms/ControlledDatePicker";
import ControlledTextarea from "@/components/forms/ControlledTextarea";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { HouseType, houseTypeOptions } from "@/types/types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type FormInputs = {
  title: string;
  address: string;
  post_date: Date;
  date_available: Date | undefined;
  description: string;
  house_type: HouseType | undefined;
  cost: number | "";
  num_beds: number;
  is_cost_per_room: boolean;
  is_utilities_included: boolean;
  is_sublet: boolean;
  has_laundry: boolean;
  has_cooking: boolean;
  has_parking: boolean;
  no_smoking: boolean;
  is_shared: boolean;
  amenities: string[];
};

const initialValues: FormInputs = {
  title: "",
  address: "",
  post_date: new Date(),
  date_available: undefined,
  description: "",
  house_type: undefined,
  cost: "",
  num_beds: 0,
  is_cost_per_room: false,
  is_utilities_included: false,
  is_sublet: false,
  has_laundry: false,
  has_cooking: false,
  has_parking: false,
  no_smoking: false,
  is_shared: false,
  amenities: [],
};

export default function AddRental() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [itemImages, setItemImages] = useState<(string | File)[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const MAX_IMAGES = 10;

  function formatMB(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isShared = watch("is_shared");

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/rentals/${id}`)
        .then((res) => res.json())
        .then((body) => {
          setIsLoading(false);
          setItemImages(body.photos);
          reset({
            title: body.title,
            description: body.description,
            cost: parseInt(body.cost),
            address: body.address,
            post_date: new Date(body.post_date),
            date_available: body.date_available ?? undefined,
            house_type: body.house_type,
            num_beds: parseInt(body.num_beds),
            is_cost_per_room: body.is_cost_per_room,
            is_utilities_included: false,
            is_sublet: body.is_sublet,
            has_laundry: body.has_laundry,
            has_cooking: body.has_cooking,
            has_parking: body.has_parking,
            no_smoking: body.no_smoking,
            is_shared: body.is_shared,
            amenities: body.amenities,
          });
        });
    }
  }, []);

  const onSubmit = async (formData: FormInputs) => {
    setIsLoading(true);
    setErrorMessage("");

    const uploadedUrls: string[] = [];

    try {
      for (const file of itemImages.filter((image) => image instanceof File)) {
        const imageForm = new FormData();
        imageForm.append("image", file);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: "POST",
          body: imageForm,
        });

        if (!res.ok) throw new Error("Image upload failed");

        const data = await res.json();
        uploadedUrls.push(data.url);
        console.log("Submitting photos:", uploadedUrls); // should be string[]
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage("One or more images failed to upload.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rentals/${id}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          photos: uploadedUrls,
        }),
      });
      queryClient.invalidateQueries({ queryKey: ["userRentals"] });
      navigate("/dashboard");

      if (!res.ok) {
        if (res.status === 500) {
          setErrorMessage("Something went wrong on our end! Please try again.");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMessage("Failed to submit rental.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg mt-[5rem]">
      <div className="text-sm text-gray-500 mb-3">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        / <span className="text-gray-700">Rental</span>
      </div>

      <h1 className="text-xl font-bold">{id ? "Edit" : "Add"} rental</h1>
      <form
        className="flex flex-col gap-[.5rem] my-[2rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="title"
          control={control}
          errors={errors}
          placeholder="Title of the listing"
          rules={{ required: "Field required" }}
        />
        <ControlledInput
          name="address"
          control={control}
          errors={errors}
          placeholder="Address"
          rules={{ required: "Field required" }}
        />
        <ControlledInput
          control={control}
          name="cost"
          errors={errors}
          placeholder="Cost of the rental"
          rules={{
            required: "Field required",
            validate: {
              numCheck: (v) => !isNaN(v as number) || "Must be a number",
            },
          }}
        />
        <ControlledDatePicker
          control={control}
          name="date_available"
          errors={errors}
          label="Date available"
          rules={{ required: "Field required" }}
        />
        <ControlledDropdown
          name="house_type"
          placeholder="House type"
          optionsLabel="Types"
          control={control}
          errors={errors}
          options={houseTypeOptions}
          rules={{ required: "Field required" }}
        />
        <ControlledTextarea
          control={control}
          name="description"
          errors={errors}
          placeholder="Enter a short description about the rental"
          rules={{ required: "Field required" }}
        />
        <ControlledCheckbox
          name="is_cost_per_room"
          control={control}
          errors={errors}
          label="Cost is per room"
        />
        <ControlledCheckbox
          name="is_shared"
          control={control}
          errors={errors}
          label="Shared with other roommates"
        />
        {isShared && (
          <ControlledInput
            name="num_beds"
            control={control}
            errors={errors}
            label="Number of other rooms in the house"
            rules={{ required: "Field required" }}
          />
        )}

        {/* Images */}
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
            // append instead of replace, cap at MAX_IMAGES
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
              if (fileInputRef.current) fileInputRef.current.value = ""; // allow re-selecting the same file
            }}
          />
        </div>
        {
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
        }

        {/* Previews grid */}
        {
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {itemImages.map((image, index) => {
              const url =
                image instanceof File ? URL.createObjectURL(image) : image;
              return (
                <div
                  key={index}
                  className="relative group rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setItemImages((prev) => [...prev].splice(index, 1));
                    }}
                    className="absolute top-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        }

        <p className="font-bold text-primary-fg mt-[1rem]">Amenities</p>
        <ControlledCheckbox
          name="is_utilities_included"
          control={control}
          errors={errors}
          label="Utilities"
        />
        <ControlledCheckbox
          name="is_sublet"
          control={control}
          errors={errors}
          label="Sublet"
        />
        <ControlledCheckbox
          name="has_laundry"
          control={control}
          errors={errors}
          label="Laundry"
        />
        <ControlledCheckbox
          name="no_smoking"
          control={control}
          errors={errors}
          label="No smoking"
        />
        <p className="text-red-500 text-[1rem]">{errorMessage}</p>
        <Submit
          label={`${id ? "Edit" : "Add"} rental`}
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
