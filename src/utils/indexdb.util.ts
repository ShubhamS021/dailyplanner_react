export enum IDBStores {
    History = 'history',
}
const dbName = 'DayplannerDB';
let dbVersion = -1;

export const initDB = async (): Promise<boolean> => {
    return await new Promise((resolve) => {
        const request = indexedDB.open(dbName);
        let db: IDBDatabase;

        request.onupgradeneeded = () => {
            db = request.result;

            // if the data object store doesn't exist, create it
            if (!db.objectStoreNames.contains(IDBStores.History)) {
                console.log('Creating history store');
                db.createObjectStore(IDBStores.History, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            dbVersion = db.version;
            console.log('request.onsuccess - initDB', dbVersion);
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addData = async <T>(
    storeName: string,
    data: T
): Promise<T | string | null> => {
    return await new Promise((resolve) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = () => {
            console.log('request.onsuccess - addData', data);
            const db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error != null) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};
