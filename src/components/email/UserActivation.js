// // UserActivation.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const UserActivation = () => {
//     const { userId } = useParams(); // Assuming the URL has /activate/:userId/:activationCode
//     const [isActive, setIsActive] = useState(false);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate(); 
//     //const activeUserURL = `https://localhost:7265/api/Registration/activateUser`
//     const activeUserURL = `https://atlas.smartgeoapps.com/AlDaleelaWebAPI/api/Registration/activateUser`

//     useEffect(() => {
//         // Function to activate the user
//         const activateUser = async () => {
//             try {
//                 // const response = await fetch(`https://your-api-url.com/activate/${userId}/${activationCode}`, {
//                 //     method: 'POST',
//                 //     headers: {
//                 //         'Content-Type': 'application/json',
//                 //     },
//                 // });

//                 // if (!response.ok) {
//                 //     throw new Error('Activation failed');
//                 // }

//                 // const result = await response.json();
//                 // if (result.success) {
//                 //     setIsActive(true);
//                 //     setMessage('Your account has been successfully activated!');
//                 // } else {
//                 //     setMessage(result.message || 'Activation failed. Please try again.');
//                 // }
//                 const response = await fetch(activeUserURL, { 
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ username:userId }),
//                 });
            
//                 // if (!response.ok) {
//                 //     throw new Error('Activation failed');
//                 // }

//                 const result = await response.json();
//                 if (result.success) {
//                     setIsActive(true);
//                     setMessage('Your account has been successfully activated!');                    
//                     localStorage.setItem("AldaleelaRole", result.data.role);
//                     localStorage.setItem("AldaleelaUserDetails:",JSON.stringify(result.data))
//                 } else {
//                     setMessage(result.message || 'Activation failed. Please try again.');
//                 }
//             } catch (error) {
//                 setMessage(error.message);
//             }
//         };

//         activateUser();
//     }, [userId]);
//     const handleRedirect = () => {
//         // Redirect to the specified link
//         navigate('/AlDaleelaWebApp'); // Use relative path
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>User Activation</h2>
//             {isActive ? (
//                 <div>
//                     <h3>{message}</h3>
//                     <p>You can now log in to your account.</p>
//                     <button onClick={handleRedirect}>Click to Signin into your application</button> {/* Button to navigate */}
//                 </div>
//             ) : (
//                 <div>
//                     <h3>{message || 'Activating your account...'}</h3>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserActivation;


// UserActivation.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import LoginLogo from '../../assets/PopLoginAuth/Logo.svg'
import SucessIcon from "../../assets/EmailVerfication/sucessIcon.svg"
import FailureIcon from "../../assets/EmailVerfication/failureIcon.svg"



const UserActivation = () => {
    const { userId } = useParams(); // Assuming the URL has /activate/:userId/:activationCode
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // New loading state
    const [isSuccess, setIsSuccess] = useState("");
    const navigate = useNavigate();
    //const activeUserURL = `https://atlas.smartgeoapps.com/AlDaleelaWebAPI/api/Registration/activateUser`;
    //const activeUserURL = `https://localhost:7265/api/Registration/activateUser`;
    const activeUserURL = `https://ead-aldaleela-staging.azurewebsites.net/api/Registration/activateUser`;
    useEffect(() => {
        const activateUser = async () => {
            try {
                const response = await fetch(activeUserURL, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: userId }),
                });
                
                const result = await response.json();
                if (result.success) {
                    setIsActive(true);
                    setMessage('Your account has been successfully activated!');
                    setIsSuccess("Success")
                    localStorage.setItem("AldaleelaRole", result.data.role);
                    localStorage.setItem("AldaleelaUserDetails", JSON.stringify(result.data));
                } else {
                    setMessage(result.message || 'Activation failed. Please try again.');
                    setIsSuccess("Failure")
                }
            } catch (error) {
                setMessage(error.message);
                setIsSuccess("Failure")
            } finally {
                setLoading(false);
            }
        };

        activateUser();
    }, [userId]);

    const handleRedirect = () => {
        // navigate('/AlDaleelaWebApp');
        navigate({
            pathname: `/${process.env.REACT_APP_BASE_URL}`,
            search: `?UserActivation=Login`,
          });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="p-5 text-black  relative w-full max-w-64">
                {/* Close Button */}

                {/* Logo */}
                <div className="flex justify-center py-2">
                    <img src={((isSuccess === "Success") || message === "User is already activated." )?SucessIcon:FailureIcon} alt="Logo" className=" text-black h-20 w-auto" /> {/* Adjust size as needed */}
                </div>

                {/* Message */}
                {!loading && (
                    <h3 className={`text-center py-2 text-[16px] font-medium text-black`}>
                        {message}
                    </h3>
                )}

                { !loading && (
                        <>
                            {isSuccess === "Success" && <p className="text-center py-2 text-[14px] text-gray-600">You can now log in to your account</p>}
                            <div className=' flex justify-center items-center w-full' >
                            <button
                               onClick={handleRedirect}
                                className="w-[50%] custom-gradient py-2 mt-4  rounded-lg text-white font-medium transition-colors duration-200"
                                aria-label="Return Home"
                            >
                                {isSuccess === "Success"?"Back to Signin":"Done"}
                            </button>
                            </div>
                        </>
                    )}

            </div>
        </div>
    );
};

export default UserActivation;
