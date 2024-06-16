import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./components/input";
import Button from "./components/button";

export default function Home() {
  const { register, handleSubmit, formState, watch } = useForm();
  return (
    <div>
      <form>
        <div id="email-input">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="please enter your email"
            className=" text-base text-black leading-3"
            {...register("email")}
          />
        </div>
        <div id="password-input">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="please enter your email"
            className=" text-base text-black leading-3"
            {...register("password")}
          />
        </div>
        <Button className="">sign in</Button>
      </form>
    </div>
  );
}
