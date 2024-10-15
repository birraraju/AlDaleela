import React, { useState,useEffect } from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { Input } from "../../../../../../../../../../components/ui/input";
import { useAuth } from "../../../../../../../../../../Providers/AuthProvider/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../../../../components/ui/select";
import {UserActivityLog} from "../../../../../../../../../Common/UserActivityLog";

export default function BasicInformation({ isEditProfile, setIsEditProfile }) {
  const {profiledetails} = useAuth()
  const [userInfo1, setUserInfo1] = useState([])
  const [finaluserInfo, setfinaluserInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    organization: "",
    country: "",
    currentemail: profiledetails.email
  })
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    Organization: "",
    Country: ""
  });
  // Basic information data
// const basicInformation = [
//   {
//     heading: "Name",
//     value: profiledetails.username,
//   },
//   {
//     heading: "Email Id",
//     value: profiledetails.email,
//   },
//   {
//     heading: "Phone Number",
//     value: profiledetails.phoneNumber,
//   },
//   {
//     heading: "Organization",
//     value: profiledetails.organization,
//   },
//   {
//     heading: "Country",
//     value: profiledetails.country,
//   },
// ];

useEffect(() => {
  const basicInformation = [
      {
          heading: "Name",
          value: profiledetails.username,
      },
      {
          heading: "Email",
          value: profiledetails.email,
      },
      {
          heading: "Phone Number",
          value: profiledetails.phoneNumber,
      },
      {
          heading: "Organization",
          value: profiledetails.organization,
      },
      {
          heading: "Country",
          value: profiledetails.country,
      },
  ];
  setUserInfo1(basicInformation);
}, [profiledetails,userInfo1]);
//setUserInfo1(basicInformation)
const handleUpdate = async(e) => {
  // Perform update logic here
  if(userInfo.Name){
    //setfinaluserInfo({ ...finaluserInfo, ["username"]: userInfo.Name });
    finaluserInfo.username=userInfo.Name;
  }
  else{
    //setfinaluserInfo({ ...finaluserInfo, ["username"]: profiledetails.username });
    finaluserInfo.username=profiledetails.Name;
  }
  if(userInfo.PhoneNumber){
    //setfinaluserInfo({ ...finaluserInfo, ["phoneNumber"]: userInfo.PhoneNumber });
    finaluserInfo.phoneNumber=userInfo.PhoneNumber;
  }
  else{
    //setfinaluserInfo({ ...finaluserInfo, ["phoneNumber"]: profiledetails.phoneNumber });
    finaluserInfo.phoneNumber=profiledetails.phoneNumber;
  }
  if(userInfo.Email){
    //setfinaluserInfo({ ...finaluserInfo, ["email"]: userInfo.Email });
    finaluserInfo.email=userInfo.Email;
  }
  else{
    //setfinaluserInfo({ ...finaluserInfo, ["email"]: profiledetails.email });
    finaluserInfo.email=profiledetails.email;
  }
  if(userInfo.Organization){
    //setfinaluserInfo({ ...finaluserInfo, ["organization"]: userInfo.Organization });
    finaluserInfo.organization=userInfo.Organization;
  }
  else{
    //setfinaluserInfo({ ...finaluserInfo, ["organization"]: profiledetails.organization });
    finaluserInfo.organization=profiledetails.organization;
  }
  if(userInfo.Country){
    //setfinaluserInfo({ ...finaluserInfo, ["country"]: userInfo.Country });
    finaluserInfo.country=userInfo.Country;
  }
  else{
    //setfinaluserInfo({ ...finaluserInfo, ["country"]: profiledetails.country });
    finaluserInfo.country=profiledetails.country;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/updateprofile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finaluserInfo),
    });
    if (response.ok) {
        // Handle successful signup
        console.log(response);
       
    } else {
        // Handle error
        console.log(response);
    }
    const data = await response.text();
    if(data == "Data Updated Successfully"){
      profiledetails.username = finaluserInfo.username;
      profiledetails.phoneNumber = finaluserInfo.phoneNumber;
      profiledetails.email = finaluserInfo.email;
      profiledetails.organization = finaluserInfo.organization;
      profiledetails.country = finaluserInfo.country;      
      UserActivityLog(profiledetails, "Profile Updated")
      //console.log(values);
      setIsEditProfile(false)
    }
    else{
      console.log(data)
    }
    // setRole("admin");
    // onClose();
  }catch (error) {
    console.error('Error submitting form:', error);
  }  
  //setIsEditProfile(false)
  //console.log('Updated user info:', userInfo);
  // Example: You could make an API call here to save the updated information
};
// Handle input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserInfo({ ...userInfo, [String(name).replace(" ","")]: value });
};
  return (
    <div className="py-4 mt-8 h-full">
      <div className="p-4 bg-white rounded-lg h-auto">
        <h1 className="font-medium tracking-wider text-lg">Basic Information</h1>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>

        {/* Data fields */}
        <div className="grid grid-cols-2 gap-8 mb-4 px-4">
          {userInfo1.map((info, index) => (
            <div key={index}>
              <h1 className="text-[#00000099] tracking-wider text-sm">
                {info.heading}
              </h1>
              {isEditProfile ? (
                info.heading === "Country" ? (
                  <Select defaultValue={info.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={info.value}
                    name={info.heading}
                    className="w-full"
                  />
                )
              ) : (
                <p className="text-black font-medium tracking-wide text-sm">
                  {info.value}
                </p>
              )}
            </div>
          ))}

          {isEditProfile && (
            <Button asChild>
              <div
                onClick={() => handleUpdate()}
                className="h-12 py-5 cursor-pointer btn-gradient text-white text-base rounded-xl mt-4 tracking-wide"
              >
                Update
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


