import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Logo from "../../../../assets/GreenLogo.svg";
import Input from "../Input/Input";
import CountryDropdown from "../../../../../src/assets/CountryDropdown.svg";
import { IoEyeOff } from "react-icons/io5";

export default function Signup({ onClose, onSigninClick }) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    password: '',
    email: '',
    phoneNumber: 0,
    organization: '',
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const isFormFilled = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const onSignupClick = async() =>{    
    try {
      const signupObj ={
        username: formData.username,
        firstName: formData.firstName,
        password: formData.password,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        organization: formData.organization,
        country: formData.country,
        role: "user"
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupObj),
      });
      if (response.ok) {
          // Handle successful signup
          console.log(response);
      } else {
          // Handle error
          console.log(response);
      }
      const data = await response.text();
      if(data){
        console.log(data)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="fixed inset-10 flex items-center justify-center z-50 mb-6">
      <div
        ref={modalRef}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-2xl border border-white shadow-lg w-full max-w-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center justify-between max-h-[80vh] overflow-y-auto">
          <div className="w-full">
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="h-14" />
            </div>
            <h2 className="font-omnes text-[28px] text-black font-medium leading-tight text-left mb-1">
              Sign Up
            </h2>
            <p className="font-omnes text-[15px] font-light text-gray-500 leading-tight text-left mb-3">
              Please create your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className='relative'>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <IoEyeOff className="text-2xl opacity-50 text-black" />
                  </button>
                </div>
                <div className='relative'>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <IoEyeOff className="text-2xl opacity-50 text-black" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  onChange={handleChange}
                />
                <div className="relative">
                  <select
                    name="country"
                    className="w-full h-[48px] px-3 py-1.5 rounded-xl text-black text-sm appearance-none border border-gray-300"
                    onChange={handleChange}
                  >
                    <option value="">Country</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <img src={CountryDropdown} alt="Dropdown" className="absolute top-1/2 right-3 -translate-y-1/2" />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full mt-2">
            <button
              type="submit"
              className={`w-[308px] h-[48px] mx-auto block py-2 rounded-xl transition duration-300 text-sm mt-10 ${
                isFormFilled()
                  ? "bg-gradient-to-r from-[#036068] text-[14px] via-[#596451] to-[#1199A8] text-white"
                  : "bg-[#828282] opacity-50 text-white text-[14px]"
              }`}
              disabled={!isFormFilled()}
              onClick={onSignupClick}
            >
              Sign Up
            </button>
            <p className="text-center mt-2 text-[14px] text-gray-600">
              Already have an account?{' '}
              <button onClick={onSigninClick} className="bg-clip-text text-transparent bg-[#036068] text-[14px] font-medium hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
