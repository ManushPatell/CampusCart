import React, { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";

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
  } = useForm<FormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const inputClassName =
    "w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400";

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

          <Submit label="Sign Up" className="mt-[1rem]" />
        </form>
      </div>
    </div>
  );
}
