import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ControlledCheckbox from "../components/forms/ControlledCheckbox";

const macEmailRegex = /^[a-zA-Z0-9._%+-]+@mcmaster\.ca$/;

type FormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { refetchUser, user } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    setIsLoading(false);

    if (res.status === 200) {
      refetchUser();
      navigate("/dashboard");
    }
    if (res.status === 400) {
      setErrorMessage("Failed to provide email and password.");
    }
    if (res.status === 401) {
      // This case should NEVER be hit, since we just registered a new user.
      setErrorMessage("Invalid login credentials. This shouldn't happen!");
    }
    if (res.status === 500) {
      setErrorMessage("An error occurred on our end. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="flex min-h-screen bg-bg text-primary-fg">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-primary-bg">
        <img
          src="/login_photo.jpg"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-[.5rem]"
        >
          <h2 className="text-2xl font-semibold text-center mb-9">Login</h2>
          <ControlledInput
            name="email"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
              validate: {
                macEmail: (v: string) =>
                  macEmailRegex.test(v) || "Invalid McMaster email",
              },
            }}
            placeholder="Email"
          />
          <ControlledInput
            name="password"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
            }}
            placeholder="Password"
            hideToggle
          />

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}
          <Submit label="Login" className="mt-3" isLoading={isLoading} />
          <span className="text-center mt-[1rem]">
            Don{"'"}t have an account?{" "}
            <Link
              to="/register"
              className="font-black text-primary-fg hover:underline"
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
