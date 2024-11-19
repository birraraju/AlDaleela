function DeleteImageFromIndexedDB(storeName, key) {
    const dbRequest = indexedDB.open("AldaleelaDB", 1); // Open the IndexedDB

    dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Create the object store only if it doesn't exist
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
        }
    };

    dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, "readwrite"); // Open a readwrite transaction
        const store = transaction.objectStore(storeName);
        
        // Delete the item by key
        const deleteRequest = store.delete(key);

        deleteRequest.onsuccess = () => {
            console.log("Image removed successfully from IndexedDB.");
        };

        deleteRequest.onerror = (event) => {
            console.error("Error removing image from IndexedDB:", event.target.error);
        };
    };

    dbRequest.onerror = (event) => {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}


 // Call to delete image from IndexedDB by passing the correct key
//  DeleteImageFromIndexedDB("AldaleelaProfileImg", "profileImage");
export default DeleteImageFromIndexedDB;
