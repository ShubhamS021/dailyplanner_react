export enum IDBStores {
    History = 'history',
}

const dbName = 'DayplannerDB';
let dbVersion = 1;
let db: IDBDatabase | null = null;

const createStores = (db: IDBDatabase) => {
    if (!db.objectStoreNames.contains(IDBStores.History)) {
        console.log('Creating history store');
        const store = db.createObjectStore(IDBStores.History, {
            keyPath: 'id',
        });
        store.createIndex('boardIdIndex', 'boardId', {
            multiEntry: true,
        });
    }
};

export const initDB = async (): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = () => {
            db = request.result;
            createStores(db);
        };

        request.onsuccess = () => {
            db = request.result;
            dbVersion = db.version;

            console.log('initDB - request.onsuccess - dbVersion', dbVersion);
            resolve(true);
        };

        request.onerror = () => {
            reject(new Error('Failed to open the database connection.'));
        };
    });
};

export const addData = async <T>(
    storeName: string,
    data: T
): Promise<T | string | null> => {
    return await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = () => {
            console.log(
                'addData - request.onsuccess - dbVersion',
                dbVersion,
                data
            );
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
                reject(new Error('Failed to add data to the database.'));
            }
        };
    });
};

export const getData = async <T>(
    storeName: string,
    id: string
): Promise<T | string | null> => {
    return await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = () => {
            console.log('request.onsuccess - getData', id);
            const db = request.result;
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const data = getRequest.result;
                resolve(data);
            };

            getRequest.onerror = () => {
                const error = getRequest.error?.message;
                if (error != null) {
                    resolve(error);
                } else {
                    reject(new Error('Failed to get data from the database.'));
                }
            };
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error != null) {
                resolve(error);
            } else {
                reject(new Error('Failed to get data from the database.'));
            }
        };
    });
};

export const getDataByIndex = async <T>(
    storeName: string,
    indexName: string,
    queryValue: any
): Promise<T | T[] | string | null> => {
    return await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = () => {
            console.log('request.onsuccess - getDataByIndex', queryValue);
            const db = request.result;
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const index = store.index(indexName);
            const getRequest = index.getAll(queryValue);

            getRequest.onsuccess = () => {
                const data = getRequest.result;
                resolve(data);
            };

            getRequest.onerror = () => {
                const error = getRequest.error?.message;
                if (error != null) {
                    resolve(error);
                } else {
                    reject(
                        new Error(
                            'Failed to get data from the database using index.'
                        )
                    );
                }
            };
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error != null) {
                resolve(error);
            } else {
                reject(
                    new Error(
                        'Failed to get data from the database using index.'
                    )
                );
            }
        };
    });
};

export const deleteData = async (
    storeName: string,
    id: string
): Promise<void> => {
    await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = () => {
                resolve(null);
            };

            deleteRequest.onerror = () => {
                const error = deleteRequest.error?.message;
                if (error != null) {
                    resolve(error);
                } else {
                    reject(
                        new Error('Failed to delete data from the database.')
                    );
                }
            };
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error != null) {
                resolve(error);
            } else {
                reject(new Error('Failed to delete data from the database.'));
            }
        };
    });
};
