import { Button } from "../../../../../components/ui/button";
import { Checkbox } from "../../../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOff } from "react-icons/io5";
import { z } from "zod"; // Still needed for schema validation
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export default function SignInForm({ onForgotPasswordClick, onSignupClick, onClose }) {
  const [isPassword, setIsPassword] = useState(false);
  const { setRole } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    setRole("admin");
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Enter Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter Username"
                    type="text"
                    {...field}
                    className="bg-white text-black h-12 shadow-none border-none outline-none rounded-lg placeholder:font-light placeholder:text-base placeholder:text-black placeholder:tracking-wide"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Enter Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter Password"
                    type={isPassword ? "text" : "password"}
                    {...field}
                    className="bg-white text-black h-12 shadow-none border-none outline-none rounded-lg placeholder:font-light placeholder:text-base placeholder:text-black placeholder:tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassword(!isPassword)}
                    className="absolute right-3 top-3"
                  >
                    <IoEyeOff className="text-2xl opacity-50 text-black" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forget Password & Stay logged in */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox className="bg-white" id="stay_logged_in" />
            <Label className="text-gray-400 text-[14px] font-omnes font-light">
              {form.formState.isValid ? "Remember me" : "Stay logged in"}
            </Label>
          </div>

          <div
            onClick={onForgotPasswordClick}
            className={`${
              form.formState.isValid
                ? "text-[#196162] text-[14px] font-medium cursor-pointer"
                : "text-[#004987] text-[14px] font-medium cursor-pointer"
            }`}
          >
            Forget Password?
          </div>
        </div>

        {/* SignIn Button */}
        <Button
          disabled={!form.formState.isValid}
          className={`w-full h-12 rounded-xl ${
            form.formState.isValid
              ? "bg-gradient-to-r from-[#036068] text-[14px] via-[#596451] to-[#1199A8] text-white"
              : "bg-[#828282] opacity-50 text-white text-[14px]"
          }`}
        >
          Sign in
        </Button>
      </form>

      <div className="flex justify-center items-center space-x-2 mt-12 text-black">
        Don't have an account?
        <div
          onClick={onSignupClick}
          className="ml-2 text-[#004987] underline cursor-pointer"
        >
          Sign Up
        </div>
      </div>
    </Form>
  );
}
