import React, {useState} from 'react'


export const UserActivityLog = async (userDetails, activity) => {
    // Fetch the IP address first
    const getIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.ip; // Return the IP address
        } catch (error) {
            console.log('Could not fetch IP address:', error);
            return null; // Return null if there was an error
        }
    };

    // Insert user activity log
    const userActivityLogInsertData = async (ipAddress) => {
        const usaObj = {
            username: userDetails.username,
            email: userDetails.email,
            ipaddress: ipAddress,
            action: activity,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserActivityLog/useractivitylogsent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usaObj),
            });            
            const data = await response.json();
          if(data.success){
            console.log('Activity logged successfully');
          }
          else{
            console.log('Error logging activity:', response);         
          }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Main flow
    const ipAddress = await getIpAddress(); // Get IP address
    if (ipAddress) {
        await userActivityLogInsertData(ipAddress); // Log activity if IP is fetched successfully
    } else {
        console.log('Failed to log activity due to missing IP address');
    }
};

