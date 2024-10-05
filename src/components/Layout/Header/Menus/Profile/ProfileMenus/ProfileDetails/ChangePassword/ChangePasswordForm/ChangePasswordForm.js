import { Button } from "../../../../../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../../../../components/ui/form";
import Input from "../../../../../../../../Popups/Login/Input/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; // Import useState
import { IoEyeOff } from "react-icons/io5"; // Import icons

const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string().min(8, "Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function ChangePasswordForm({ setIsChangePassword, setIsSuccess, setIsProfile }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function onSubmit(values) {
    console.log(values);
    setIsSuccess(true);
    setIsProfile(false);
    setIsChangePassword(false);
  }

  const onCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Your unsaved changes may be lost.");
    if (confirmCancel) {
      setIsChangePassword(false);
      setIsProfile(true);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 p-2">
        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[400] font-omes text-gray-800 text-[14px] tracking-wide">
                Current Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3"
                  >
                    <IoEyeOff className="text-2xl opacity-50" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[400] font-omes text-gray-800 text-[14px] tracking-wide">
                New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="New Password"
                    type={showNewPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3"
                  >
                    <IoEyeOff className="text-2xl opacity-50" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password */}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[400] font-omes text-gray-800 text-[14px] tracking-wide">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3"
                  >
                    <IoEyeOff className="text-2xl opacity-50" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <div className="flex justify-between space-x-4">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className="w-1/2 h-12 font-medium font-omes text-black text-[14px] rounded-xl bg-white shadow-none border border-black"
          >
            Cancel
          </Button>

          <Button type="submit" className="w-1/2 h-12 rounded-xl btn-gradient text-lg">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
