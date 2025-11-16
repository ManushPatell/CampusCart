import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const waterlooEmailRegex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
const laurierEmailRegex = /^[a-zA-Z0-9._%+-]+@mylaurier\.ca$/;

export default function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  const redirectTo = decodeURIComponent(redirect ?? "") || "/dashboard";

  const passwordValue = watch("password");

  // Lock background scroll while this view is mounted
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setIsLoading(true);

      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setIsLoading(false);

      if (res.status === 500)
        setErrorMessage(
          "An error occurred on our end. Please try again later.",
        );
      if (res.status === 409)
        setError("email", {
          type: "manual",
          message: "That email has been taken",
        });
      if (res.status === 400)
        setErrorMessage("Improper request! Are you sure you meant to do that?");
      if (res.status === 201) {
        const loginRes = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
            credentials: "include",
          },
        );
        if (loginRes.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["auth"] });
          navigate(redirectTo);
        } else if (loginRes.status === 400)
          setErrorMessage("Failed to provide email and password.");
        else if (loginRes.status === 401)
          setErrorMessage("Invalid login credentials. This shouldn't happen!");
        else if (loginRes.status === 500)
          setErrorMessage("An error occurred on our end. Please try again.");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
      console.error("POST failed:", err);
    }
  };

  return (
    <div
      className="relative min-h-[100svh] text-primary-fg"
      style={{ overscrollBehaviorY: "contain" }}
    >
      {/* Full-bleed background image */}
      <img
        src="/isaiah.jpg"
        alt=""
        className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Subtle dark overlay to improve card contrast (keeps your theme intact) */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      {/* Centered card layer */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 sm:px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            bg-white p-8 rounded-2xl shadow-lg
            w-full max-w-md lg:max-w-lg
            flex flex-col gap-[.5rem]
            border
            overflow-auto
          "
          style={{
            borderColor: "#E7E0D6", // matches your warm border tone
            maxHeight: "calc(100svh - 2rem)", // allow internal scroll on small screens
          }}
          method="POST"
          action={`${import.meta.env.VITE_API_URL}/users`}
          autoComplete="on"
        >
          <h2 className="text-2xl font-semibold mb-9 text-center">Sign Up</h2>

          <ControlledInput
            name="firstName"
            control={control}
            errors={errors}
            rules={{ required: "Field required" }}
            placeholder="First name"
          />
          <ControlledInput
            name="lastName"
            control={control}
            errors={errors}
            rules={{ required: "Field required" }}
            placeholder="Last name"
          />
          <ControlledInput
            name="email"
            control={control}
            errors={errors}
            type="email"
            rules={{
              required: "Field required",
              validate: {
                validEmail: (v: string) =>
                  waterlooEmailRegex.test(v) ||
                  laurierEmailRegex.test(v) ||
                  "Invalid UWaterloo or Laurier email",
              },
            }}
            placeholder="Email"
            autocomplete="username"
          />
          <ControlledInput
            name="password"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
              validate: {
                moreThan8: (v: string) =>
                  v.length > 8 || "Must be longer than 8 characters",
                includesNum: (v: string) =>
                  /\d/.test(v) || "Must include a number",
                hasSpecial: (v: string) =>
                  /[!@#$%^&*(),.?\":{}|<>]/.test(v) ||
                  "Must include special character",
              },
            }}
            placeholder="Password"
            type="password"
            autocomplete="new-password"
          />
          <ControlledInput
            name="confirmPassword"
            control={control}
            errors={errors}
            type="password"
            placeholder="Confirm password"
            autocomplete="new-password"
            rules={{
              required: "Field required",
              validate: {
                matchesPassword: (v: string) =>
                  v === passwordValue || "Passwords do not match",
              },
            }}
          />

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}

          <Submit label="Sign Up" className="mt-[1rem]" isLoading={isLoading} />

          <span className="text-center mt-[1rem]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-black text-primary-fg hover:underline"
            >
              Log in
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
