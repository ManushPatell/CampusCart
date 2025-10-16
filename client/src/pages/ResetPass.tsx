import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const macEmailRegex = /^[a-zA-Z0-9._%+-]+@mcmaster\.ca$/;

type FormInputs = {
  email: string;
};

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({ defaultValues: { email: "" } });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redirect if already authed
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

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
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        },
      );

      const body = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setErrorMessage("");
      } else {
        setIsSuccess(false);
        setErrorMessage(JSON.stringify(body));
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
        >
          <h2 className="text-2xl font-semibold text-center mb-8">
            Reset Password
          </h2>

          {isSuccess ? (
            <p>
              Check your email for a reset link! The university will likely flag
              our email as spam, so check your spam folder or go to your
              university Outlook Quarantine page. Make sure to reset your
              password within the next 5 minutes otherwise the link will expire.
            </p>
          ) : (
            <>
              <span className="text-center mb-2">
                Enter the email you signed up with below, and we will send you a
                link to change your password.
              </span>
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
            </>
          )}

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}
          <Submit label="Send email" isLoading={isLoading} />
          <span className="text-center mt-[1rem]">
            Ready to{" "}
            <Link
              to="/login"
              className="font-black text-primary-fg hover:underline"
            >
              login
            </Link>
            ?
          </span>
        </form>
      </div>
    </div>
  );
}
