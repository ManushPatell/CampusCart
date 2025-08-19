import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import ControlledDropdown from "@/components/forms/ControlledDropdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

export default function AddTextbook() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTextbook, setIsLoadingTextbook] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [errorMessage, setErrorMessage] = useState<string>("");
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

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/textbooks/${id}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

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

  useEffect(() => {
    if (id) {
      setIsLoadingTextbook(true);
      fetch(`${import.meta.env.VITE_API_URL}/textbooks/${id}`)
        .then((res) => res.json())
        .then((body) => {
          setIsLoadingTextbook(false);
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
    <div className="bg-primary-bg m-[3rem] shadow-2xl px-[2rem] py-[2rem] rounded-lg">
      <span
        className="flex hover:gap-[.5rem] hover:font-semibold gap-[0rem] transition-all ease-linear duration-100 w-fit h-[1.5rem] items-center mb-[1rem]"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="p-[.3rem] flex items-center justify-center" />
        <p>Go back</p>
      </span>
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
