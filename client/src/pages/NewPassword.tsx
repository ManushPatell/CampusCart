import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type FormInputs = {
  password: string;
  confirmPassword: string;
};

export default function Login() {
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ token, password: data.password }),
        },
      );

      if (res.ok) {
        navigate("/login");
      } else {
        setErrorMessage("An error occurred");
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
          action={`${import.meta.env.VITE_API_URL}/auth/change-password`}
          autoComplete="on"
        >
          <h2 className="text-2xl font-semibold text-center mb-9">
            Change Password
          </h2>

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
            placeholder="New password"
            type="password"
            autocomplete="new-password"
          />
          <ControlledInput
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder="Confirm password"
            type="password"
            rules={{
              required: "Field required",
              validate: {
                isSamePassword: (v: string) =>
                  v === password || "Passwords must match",
              },
            }}
          />

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}
          <Submit label="Change password" className="" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}
