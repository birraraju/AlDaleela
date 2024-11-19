function GetImageFromIndexedDB(storeName, callback) {
    const dbRequest = indexedDB.open("AldaleelaDB", 1); // Ensure the same database name and version

    dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName); // Create object store if missing
        }
    };

    dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const getRequest = store.get("profileImage"); // Retrieve the image by key

        getRequest.onsuccess = () => {
            callback(getRequest.result); // Pass the image to the callback
        };

        getRequest.onerror = () => {
            console.error("Failed to retrieve image from IndexedDB.");
            callback(null);
        };
    };

    dbRequest.onerror = (event) => {
        console.error("Failed to open IndexedDB:", event.target.error);
        callback(null);
    };
}

// Example usage:
// getImageFromIndexedDB("AldaleelaProfileImg", (image) => {
//     if (image) {
//         console.log("Retrieved image:", image);
//     } else {
//         console.log("No image found in IndexedDB.");
//     }
// });

export default GetImageFromIndexedDB;


// const HandleLocalDetails = () => {
//     // Retrieve the user details from localStorage
//     const Userdetails = localStorage.getItem("AldaleelaUserDetails:");

//     // Retrieve image URL from IndexedDB
//     GetImageFromIndexedDB("AldaleelaProfileImg", (image) => {
//       if (image) {
//         console.log("Retrieved Image from IndexedDB:", image);
        
//         // Check if user details exist and parse it to an object
//         if (Userdetails) {
//           const parsedDetails = JSON.parse(Userdetails);
  
//           // Add image URL to parsedDetails
//           parsedDetails.imageUrl = image;  // Adding the image URL from IndexedDB to the user details
  
//           // If the role is not set and exists in the local storage data, set it
//           if (role == null && parsedDetails.role && parsedDetails.useractive) {
//             setRole(parsedDetails.role);
//           }
  
//           // Set the profile details with the updated user details including the image URL
//           if (profiledetails == null) {
//             setprofiledetails(parsedDetails);
//           }
//         }
//       } else {
//         console.log("No image found in IndexedDB.");
//       }
//     });
// };
