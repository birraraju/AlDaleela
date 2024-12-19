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
import { useEffect, useState } from "react"; // Import useState
import { IoEyeOff,IoEye } from "react-icons/io5"; // Import icons
import { useAuth } from "../../../../../../../../../Providers/AuthProvider/AuthProvider";
import {UserActivityLog} from "../../../../../../../../Common/UserActivityLog";
import { useTheme } from "../../../../../../../../Layout/ThemeContext/ThemeContext"; // Import your theme context

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

  const formSchemaArab = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "يجب أن تكون كلمة المرور الجديدة على الأقل 8 أحرف"),
    confirmNewPassword: z.string().min(8, "كلمات السر غير متطابقة"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "كلمات السر غير متطابقة",
    path: ["confirmNewPassword"],
  });


  
export default function ChangePasswordForm({setIsProfileData,setModalMessage,setIsMsgStatus, setIsChangePassword,setIsFailure, setChangeCloseProfile,setIsSuccess, setIsProfile }) {
  const {profiledetails } = useAuth()
  const[isValid,setIsValid]=useState(false)
  const [ValidationButton,setValidationButton] = useState(false)
  const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context
  const form = useForm({
    resolver: zodResolver( isLangArab ? formSchemaArab : formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  
  const currentPassword=form.watch("currentPassword")
  const newPassword=form.watch("newPassword")
  const confirmNewPassword=form.watch("confirmNewPassword")

  
  useEffect(()=>{
    if(currentPassword && newPassword && confirmNewPassword){
      setValidationButton((currentPassword && newPassword && confirmNewPassword))
    }
  },[currentPassword,newPassword,confirmNewPassword])
  

  
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async(values) => {

    
    try {
      const signupObj ={
        email:profiledetails.email,
        oldpassword:values.currentPassword,
        newpassword:values.newPassword
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/updatepassword`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupObj),
      });
      const data = await response.json();
      if(data.success){
        //console.log(values);
        UserActivityLog(profiledetails, "Change Password")
        setIsSuccess(true);
        setModalMessage("Password Change Scuccessfully")

        setIsProfile(false);
        setIsChangePassword(false);
        setIsMsgStatus("Success")
        setIsProfileData(false)
      }
      else{
        //console.log(data)
        setIsSuccess(false);
        setIsMsgStatus("Failure");
        setModalMessage(data.message)
        setIsProfileData(false)
        setIsFailure(true)
        setIsProfile(false);
        setChangeCloseProfile(false);      

      }
    }catch (error) {
      setIsMsgStatus("Failed")
      console.error('Error submitting form:', error);
    }    
  }

  const onCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Your unsaved changes may be lost.");
    if (confirmCancel) {
      setChangeCloseProfile(false);
      setIsProfile(true);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form dir={isLangArab && "rtl"} onSubmit={form.handleSubmit(onSubmit)} className="sm:space-y-3 space-y-6 sm:p-2 p-2">
        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem c>
              <FormLabel className={`font-400   sm:text-[14px] tracking-wide ${
              isDarkMode ? "text-white" : "text-[#000000CC]"
            }`}>
                 
                {isLangArab?"كلمة المرور الحالية  ":"Current Password "}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isLangArab?"كلمة المرور الحالية  ":"Current Password "}
                    isLangArab={isLangArab}
                    type={showCurrentPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={`absolute ${ isLangArab?"left-3":"right-3"} top-3`}
                  >
                     {showCurrentPassword ? (
                  <IoEye className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                ) : (
                  <IoEyeOff className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                    )}
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
            <FormItem className="flex flex-col ">
              <FormLabel className={`font-400 ${isDarkMode ? "text-white" : "text-[#000000CC]"} text-[14px] tracking-wide`}>
                
                {isLangArab?"كلمة المرور الجديدة":"New Password"}

              
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isLangArab?"كلمة المرور الجديدة":"New Password"}
                    type={showNewPassword ? "text" : "password"}
                    isLangArab={isLangArab}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute ${ isLangArab?"left-3":"right-3"} top-3`}
                  >
                     {showNewPassword ? (
                  <IoEye className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                ) : (
                  <IoEyeOff className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                    )}
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
              <FormLabel className={`font-400 font-omes ${isDarkMode ? "text-white" : "text-[#000000CC]"} text-[14px]  tracking-wide`}>
               
                {isLangArab?"تأكيد كلمة المرور الجديدة":" Confirm New Password"}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isLangArab?"تأكيد كلمة المرور الجديدة":" Confirm New Password"}
                    type={showConfirmPassword ? "text" : "password"}
                    isLangArab={isLangArab}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute ${ isLangArab?"left-3":"right-3"} top-3`}
                  >
                     {showConfirmPassword ? (
                  <IoEye className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                ) : (
                  <IoEyeOff className={`text-2xl ${isDarkMode ? 'text-black' : 'text-black'} opacity-50`} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <div className="flex justify-between pt-4 gap-4 space-x-4">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className="w-1/2 h-12 font-medium font-omes  text-black text-[14px] rounded-xl bg-white shadow-none border border-gray-300"
          >
             {isLangArab?"إلغاء":"Cancel"}
            
          </Button>

          <Button
          disabled={!ValidationButton} 
          type="submit" 
          
          className={`w-1/2 h-12 rounded-xl ${ !ValidationButton ?"bg-gray-400":"btn-gradient"} text-[14px]`}>
            {isLangArab?"تحديث":"Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
