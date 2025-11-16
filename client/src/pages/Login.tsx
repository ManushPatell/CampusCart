import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

type FormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  const redirectTo = decodeURIComponent(redirect ?? "") || "/dashboard";

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({ defaultValues: { email: "", password: "" } });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redirect if already authed
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate]);

  // Lock background scroll while this view is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        navigate(redirectTo, { replace: true });
      } else if (res.status === 400) {
        setErrorMessage("Failed to provide email and password.");
      } else if (res.status === 401) {
        setErrorMessage("Invalid login credentials. This shouldn't happen!");
      } else if (res.status === 500) {
        setErrorMessage("An error occurred on our end. Please try again.");
      } else {
        setErrorMessage("An error occured");
      }
    } catch (err) {
      setErrorMessage(String(err));
    } finally {
      setIsLoading(false);
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
      {/* Subtle overlay so the card pops */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      {/* Centered login card */}
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
          style={{ borderColor: "#E7E0D6", maxHeight: "calc(100svh - 2rem)" }}
          method="POST"
          action={`${import.meta.env.VITE_API_URL}/auth/login`}
          autoComplete="on"
        >
          <h2 className="text-2xl font-semibold text-center mb-9">Login</h2>

          <ControlledInput
            name="email"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
            }}
            placeholder="Email"
            autocomplete="username"
          />
          <ControlledInput
            name="password"
            control={control}
            errors={errors}
            rules={{ required: "Field required" }}
            placeholder="Password"
            type="password"
            autocomplete="current-password"
          />
          <Link
            to="/forgot-password"
            className="font-black text-primary-fg hover:underline ml-auto my-1.5"
          >
            Forgot password?
          </Link>

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}
          <Submit label="Login" className="" isLoading={isLoading} />
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
