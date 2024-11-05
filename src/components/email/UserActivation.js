// UserActivation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserActivation = () => {
    const { userId } = useParams(); // Assuming the URL has /activate/:userId/:activationCode
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    //const activeUserURL = `https://localhost:7265/api/Registration/activateUser`
    const activeUserURL = `https://atlas.smartgeoapps.com/AlDaleelaWebAPI/api/Registration/activateUser`

    useEffect(() => {
        // Function to activate the user
        const activateUser = async () => {
            try {
                // const response = await fetch(`https://your-api-url.com/activate/${userId}/${activationCode}`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // });

                // if (!response.ok) {
                //     throw new Error('Activation failed');
                // }

                // const result = await response.json();
                // if (result.success) {
                //     setIsActive(true);
                //     setMessage('Your account has been successfully activated!');
                // } else {
                //     setMessage(result.message || 'Activation failed. Please try again.');
                // }
                const response = await fetch(activeUserURL, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username:userId }),
                });
            
                // if (!response.ok) {
                //     throw new Error('Activation failed');
                // }

                const result = await response.json();
                if (result.success) {
                    setIsActive(true);
                    setMessage('Your account has been successfully activated!');                    
                    localStorage.setItem("AldaleelaRole", result.data.role);
                    localStorage.setItem("AldaleelaUserDetails:",JSON.stringify(result.data))
                } else {
                    setMessage(result.message || 'Activation failed. Please try again.');
                }
            } catch (error) {
                setMessage(error.message);
            }
        };

        activateUser();
    }, [userId]);
    const handleRedirect = () => {
        // Redirect to the specified link
        navigate('/AlDaleelaWebApp'); // Use relative path
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Activation</h2>
            {isActive ? (
                <div>
                    <h3>{message}</h3>
                    <p>You can now log in to your account.</p>
                    <button onClick={handleRedirect}>Click to Signin into your application</button> {/* Button to navigate */}
                </div>
            ) : (
                <div>
                    <h3>{message || 'Activating your account...'}</h3>
                </div>
            )}
        </div>
    );
};

export default UserActivation;
