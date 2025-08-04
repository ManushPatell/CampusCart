import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useState } from "react";
import ControlledCheckbox from "../components/forms/ControlledCheckbox";
import ControlledDatePicker from "@/components/forms/ControlledDatePicker";
import ControlledTextarea from "@/components/forms/ControlledTextarea";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { HouseType, houseTypeOptions } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { set } from "date-fns";

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
  images: string[];
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
  images: [],
};

export default function AddRental() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);

      for (const file of files){
        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/upload`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!res.ok) {
            setErrorMessage("Failed to upload image. Please try again.");
            continue;
          }

          const data = await res.json();
          setUploadedImage((prev) => [...prev, data.imageUrl]);
        } catch (error) {
          console.error("Error uploading image:", error);
          setErrorMessage("An error occurred while uploading the image.");
        }
      }
  };

  


  const navigate = useNavigate();

  const isShared = watch("is_shared");

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);

    const fullData = {
      ...data,
      images: uploadedImage,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rentals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fullData), 
      });

      if (!res.ok) {
        if (res.status === 500)
          setErrorMessage("Something went wrong on our end! Please try again.");
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

      <h1 className="text-xl font-bold">Add rental</h1>
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
       <label className = "font-semibold text-primary-fg mt-4"> Upload Images </label>
        <input 
          type = "file"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
          className = "mt-2 mb-4"
          />
        
        <div className = "flex flex-wrap gap-2">
          {uploadedImage.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Uploaded ${index + 1}`}
              className="w-24 h-24 object-cover rounded-lg"
              />
          ))}
        </div>

        {isShared && (
          <ControlledInput
            name="num_beds"
            control={control}
            errors={errors}
            label="Number of other rooms in the house"
            rules={{ required: "Field required" }}
          />
        )}
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
          label="Add rental"
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
