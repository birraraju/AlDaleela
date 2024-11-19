function SaveImageToIndexedDB(storeName, imageUrl) {
    const dbRequest = indexedDB.open("AldaleelaDB", 1); // Version 1
    dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName); // Create object store
        }
    };

    dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.put(imageUrl, "profileImage"); // Save image using a key
        console.log("Image saved to IndexedDB.");
    };

    dbRequest.onerror = (event) => {
        console.error("Failed to open IndexedDB:", event.target.error);
    };
}

export default SaveImageToIndexedDB;