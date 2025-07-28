import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useState } from "react";
import ControlledCheckbox from "../components/forms/ControlledCheckbox";

type FormInputs = {
  address: string;
  post_date: Date;
  date_available: Date;
  description: string;
  house_type: string; // TODO: Make this an enum
  cost: number;
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
  address: "",
  post_date: new Date(),
  date_available: new Date(),
  description: "",
  house_type: "", // TODO: Make this an enum
  cost: 0,
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
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isShared = watch("is_shared");

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    console.log("Login submitted", data);
  };

  // TODO: Add description (textarea), add date available with a dat picker also house type dropdown
  return (
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg">
      <h1 className="text-xl font-bold">Add rental</h1>
      <form
        className="flex flex-col gap-[.5rem] my-[2rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="address"
          control={control}
          errors={errors}
          placeholder="Address"
          rules={{ required: "Field required" }}
        />
        <ControlledCheckbox
          name="is_cost_per_room"
          control={control}
          errors={errors}
          label="Cost is per room"
          rules={{ required: "Field required" }}
        />
        <ControlledCheckbox
          name="is_shared"
          control={control}
          errors={errors}
          label="Shared with other roommates"
          rules={{ required: "Field required" }}
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
        <p className="font-bold text-primary-fg mt-[1rem]">Amenities</p>
        <ControlledCheckbox
          name="is_utilities_included"
          control={control}
          errors={errors}
          label="Utilities"
          rules={{ required: "Field required" }}
        />
        <ControlledCheckbox
          name="is_sublet"
          control={control}
          errors={errors}
          label="Sublet"
          rules={{ required: "Field required" }}
        />

        <ControlledCheckbox
          name="has_laundry"
          control={control}
          errors={errors}
          label="Laundry"
          rules={{ required: "Field required" }}
        />
        <ControlledCheckbox
          name="no_smoking"
          control={control}
          errors={errors}
          label="No smoking"
          rules={{ required: "Field required" }}
        />
        <Submit
          label="Add rental"
          isLoading={isLoading}
          className="mt-[2rem]"
        />
      </form>
    </div>
  );
}
