"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Input } from "./components/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./components/ui/loading-spinner";
import { loginHandler } from "./services/auth";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaTwitter } from "react-icons/fa";

export default function Home() {
  //form types
  interface FormInput {
    email: string;
    password: string;
  }

  //handle form state
  const form = useForm<FormInput>();
  const { register, control, formState, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  //handle error message state
  const [errorMessage, setErroMessage] = useState("");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await loginHandler(data);
    if (response.status !== 200) {
      setErroMessage(response.data.message);
    }
  };
  return (
    <>
      <form
        className="flex flex-col items-start gap-3  justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="email-input" className="flex gap-3 flex-col w-full">
          <label htmlFor="email" id="email" className="text-gray-400">
            Email
          </label>
          <Input
            type="email"
            placeholder="please enter your email"
            className=" text-base text-black leading-3"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "please enter a valid email",
              },
            })}
          />

          <p className="text-red-600 text-sm">
            {errors.email?.message ? String(errors.email.message) : null}
          </p>
        </div>
        <div id="password-input" className="flex gap-3 flex-col w-full">
          <label htmlFor="password" className="text-gray-400">
            Password
          </label>
          <Input
            type="password"
            placeholder="please enter your password"
            className=" text-base text-black leading-3"
            {...register("password", {
              required: {
                value: true,
                message: "password cannot be empty",
              },
            })}
          />
          <p className="text-red-600 text-sm font-semibold">
            {errors.password?.message ? String(errors.password.message) : null}
          </p>
        </div>
        <div id="submit-button" className="self-start w-full">
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : "Sign in"}
          </Button>
        </div>
        <div id="error-message">
          {errorMessage && (
            <p className="text-red-600 text-sm font-semibold whitespace-pre w-fit">
              {errorMessage}
            </p>
          )}
        </div>

        <div id="oauth" className="w-full">
          <div
            id="separator"
            className="flex flex-row items-center w-full justify-center gap-2"
          >
            <Separator className="text-gray-800 w-32" /> or{" "}
            <Separator className="text-gray-800 w-32" />
          </div>
          <div
            id="socials"
            className="flex flex-row gap-2 items-stretch justify-between"
          >
            <Link
              href="/google"
              className="flex flex-row gap-1 px-4 py-2 border border-gray-400 border-solid rounded-md items-center justify-center"
            >
              <FaGoogle />
              Google
            </Link>
            <Link
              href="/google"
              className="flex flex-row gap-1 px-4 py-2 border border-gray-400 border-solid rounded-md items-center justify-center"
            >
              <FaTwitter /> Twiiter
            </Link>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}
