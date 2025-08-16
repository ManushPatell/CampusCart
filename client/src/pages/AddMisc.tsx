import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
  const [isLoadingMisc, setIsLoadingMisc] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/misc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
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

  useEffect(() => {
    if (id) {
      setIsLoadingMisc(true);
      fetch(`${import.meta.env.VITE_API_URL}/misc/${id}`)
        .then((res) => res.json())
        .then((body) => {
          setIsLoadingMisc(false);
          reset({
            title: body.title,
            description: body.description,
            price: parseInt(body.price),
            listing_type: body.listing_type,
          });
        });
    }
  }, []);

  return (
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg">
      <span
        className="flex hover:gap-[.5rem] hover:font-semibold gap-[0rem] transition-all ease-linear duration-100 w-fit h-[1.5rem] items-center mb-[1rem]"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="p-[.3rem] flex items-center justify-center" />
        <p>Go back</p>
      </span>
      <h1 className="text-xl font-bold">{id ? "Edit" : "Add"} miscellaneous</h1>
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

        <p className="text-red-500 text-[1rem]">{errorMessage}</p>
        <Submit
          label={`${id ? "Edit" : "Add"} miscellaneous`}
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
