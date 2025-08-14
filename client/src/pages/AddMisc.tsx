import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useState, useEffect, useRef} from "react";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Select } from "react-day-picker";


const listingType = Object.freeze(["Wanting", "Selling"]);
type ListingType = (typeof listingType)[number];

type FormInputs = {
  title: string;
  description: string;
  price: number | "";
  listing_type: ListingType;
};

const initialValues: FormInputs = {
  title: "",
  description: "",
  price: "",
  listing_type: "",
};

export default function AddMisc() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const MAX_IMAGES = 10;

function formatMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}


  useEffect(() => {
    const urls = selectedImages.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u)); // cleanup
  }, [selectedImages]); 


  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const onSubmit = async (formData: FormInputs) => {
    setIsLoading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of selectedImages){
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
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("One or more images failed to upload.");
      setIsLoading(false);
      return;
    }

    const fullData = {
      ...formData,
      photos: uploadedUrls,
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/misc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fullData),
      });

      const body = await res.json();

      if (!res.ok) {
        if (res.status === 500) {
          setErrorMessage("Something went wrong on our end! Please try again.");
        } else {
          setErrorMessage(body.error);
        }
      } else {
        navigate("/dashboard");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg">
      <span
        className="flex hover:gap-[.5rem] hover:font-semibold gap-[0rem] transition-all ease-linear duration-100 w-fit h-[1.5rem] items-center mb-[1rem]"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="p-[.3rem] flex items-center justify-center" />
        <p>Go back</p>
      </span>
      <h1 className="text-xl font-bold">Add Miscellanous </h1>
      <form
        className="flex flex-col gap-[.5rem] my-[2rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="title"
          control={control}
          errors={errors}
          placeholder="Listing title"
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
          name="description"
          control={control}
          errors={errors}
          placeholder="Description"
          rules={{ required: "Field required" }}
        />
        <ControlledDropdown
          name="listing_type"
          placeholder="Listing type"
          optionsLabel="Types"
          control={control}
          errors={errors}
          options={listingType as ListingType[]}
          rules={{ required: "Field required" }}
        />  

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
    const files = Array.from(e.dataTransfer.files || []).filter(f =>
      f.type.startsWith("image/")
    );
    if (!files.length) return;
    // append instead of replace
    setSelectedImages((prev) => {
      const merged = [...prev, ...files].slice(0, MAX_IMAGES);
      return merged;
    });
  }}
  className="rounded-2xl border-2 border-dashed border-zinc-300 bg-white/60 
             hover:border-zinc-400 transition-colors p-6 text-center cursor-pointer"
>
  <div className="flex flex-col items-center gap-2 text-zinc-700">
    {/* icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 15v4H5v-4H3v6h18v-6zM11 3v10.17l-3.59-3.58L6 11l6 6 6-6-1.41-1.41L13 13.17V3z"/>
    </svg>
    <p className="text-sm">
      Drag & drop images here, or <span className="underline">browse</span>
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
      setSelectedImages((prev) => {
        const merged = [...prev, ...files].slice(0, MAX_IMAGES);
        return merged;
      });
      if (fileInputRef.current) fileInputRef.current.value = ""; // allow re-select same file
    }}
  />
</div>

{/* Selected summary + clear */}
{previewUrls.length > 0 && (
  <div className="mt-3 mb-2 flex items-center justify-between text-sm text-zinc-600">
    <span>
      {previewUrls.length}/{MAX_IMAGES} selected
    </span>
    <button
      type="button"
      onClick={() => setSelectedImages([])}
      className="underline hover:opacity-80"
    >
      Remove all
    </button>
  </div>
)}

{/* Previews grid */}
{previewUrls.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {previewUrls.map((url, index) => {
      const f = selectedImages[index];
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
          {/* file meta */}
          {f && (
            <div className="absolute left-2 bottom-2 text-[11px] px-2 py-0.5 rounded bg-black/55 text-white">
              {f.name.length > 18 ? f.name.slice(0, 18) + "…" : f.name} · {formatMB(f.size)}
            </div>
          )}
          {/* remove */}
          <button
            type="button"
            onClick={() => {
              setSelectedImages((prev) => {
                const next = [...prev];
                next.splice(index, 1);
                return next;
              });
            }}
            className="absolute top-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5
                       opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
            aria-label={`Remove image ${index + 1}`}
          >
            ✕
          </button>
        </div>
      );
    })}
  </div>
)}
        <p className="text-red-500 text-[1rem]">{errorMessage}</p>
        <Submit
          label="Add Miscallenous"
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
