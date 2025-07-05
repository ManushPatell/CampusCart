import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const macEmailRegex = /^[a-zA-Z0-9._%+-]+@mcmaster\.ca$/;

// Satisfies XXX-XXX-XXXX where X is digit 0-9
const validPhoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;

export default function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsLoading(false);

      if (res.status === 500) {
        setErrorMessage(
          "An error occurred on our end. Please try again later.",
        );
      }
      if (res.status === 409) {
        setError("email", {
          type: "manual",
          message: "That email has been taken",
        });
      }
      if (res.status === 400) {
        setErrorMessage("Improper request! Are you sure you meant to do that?");
      }
      if (res.status === 201) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          credentials: "include",
        });
        if (res.status === 200) {
          navigate(`/dashboard`);
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
      }
    } catch (err) {
      if (typeof err === "string") {
        setErrorMessage(err);
      }
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      console.error("POST failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="/login_photo.jpg"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Sign-Up Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-[.5rem]"
        >
          <h2 className="text-2xl font-semibold mb-9 text-center">Sign Up</h2>

          <ControlledInput
            name="firstName"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
            }}
            placeholder="First name"
          />
          <ControlledInput
            name="lastName"
            control={control}
            errors={errors}
            rules={{
              required: "Field required",
            }}
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
                macEmail: (v: string) =>
                  macEmailRegex.test(v) || "Invalid McMaster email",
              },
            }}
            placeholder="Email"
          />
          <ControlledInput
            name="phoneNumber"
            control={control}
            errors={errors}
            type="tel"
            rules={{
              required: "Field required",
              validate: {
                validNumber: (v: string) =>
                  validPhoneNumberRegex.test(v) ||
                  "Must match format XXX-XXX-XXXX",
              },
            }}
            placeholder="Phone number"
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
                  /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                  "Must include special character",
              },
            }}
            placeholder="Password"
            hideToggle
          />

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}
          <Submit label="Sign Up" className="mt-[1rem]" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}
