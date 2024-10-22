import { useEffect, useState } from "react";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Forgetpassword from "./ForgetPass/ForgetPassword";
import ResetPassword from "./NewPassword/NewPassword";
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import the theme hook


export default function Login({ onClose }) {
  const [currentView, setCurrentView] = useState("signin");
  const [email, setEmail] = useState("");
  const {isLogin,isSignup } = useTheme(); // Use the theme hook

  useEffect(()=>{
    if(isLogin){
      setCurrentView("signin")
    }else if(isSignup){
      setCurrentView("signup")
    }
  },[isLogin,isSignup])

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleClose = () => {
    onClose();
  };

  const handleForgotPasswordNext = (email) => {
    setEmail(email);
    setCurrentView("newpassword");
  };

  const handlePasswordSet = () => {
    handleViewChange("signin");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "signin":
        return (
          <Signin
            onClose={handleClose}
            onSignupClick={() => handleViewChange("signup")}
            onForgotPasswordClick={() => handleViewChange("forgotpassword")}
          />
        );
      case "signup":
        return (
          <Signup
            onClose={handleClose}
            onSigninClick={() => handleViewChange("signin")}
          />
        );
      case "forgotpassword":
        return (
          <Forgetpassword
            onClose={handleClose}
            onBackToLogin={() => handleViewChange("signin")}
            onSignup={() => handleViewChange("signup")}
            onNext={handleForgotPasswordNext}
          />
        );
      case "newpassword":
        return (
          <ResetPassword
            email={email}
            onClose={handleClose}
            onBackToLogin={() => handleViewChange("signin")}
            onSignup={() => handleViewChange("signup")}
            onPasswordSet={handlePasswordSet}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed sm:inset-10 inset-1 z-50 flex items-center justify-center">
      {renderCurrentView()}
    </div>
  );
}
