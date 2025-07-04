import React, { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import ControlledInput from "../components/forms/ControlledInput";
import Submit from "../components/forms/Submit";

const macEmailRegex = /^[a-zA-Z0-9._%+-]+@mcmaster\.ca$/;

type FormInputs = {
  email: string;
  password: string;
};

export default function Login() {
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
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
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
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
          />

          <Submit label="Login" className="mt-3" />
        </form>
      </div>
    </div>
  );
}
