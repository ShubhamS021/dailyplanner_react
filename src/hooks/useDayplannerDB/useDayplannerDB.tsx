import { useEffect, useState } from 'react';
import { type IDBPDatabase, openDB } from 'idb';

interface DayplannerDB {
    history: {
        id: string;
        value: any;
        boardId: string;
    };
    // Add more store types here
}

type StoreName = keyof DayplannerDB;

const dbName = 'DayplannerDB';
const dbVersion = 1;

const upgradeDB = (db: IDBPDatabase<DayplannerDB>) => {
    // Add upgrade logic here
    if (!db.objectStoreNames.contains('history')) {
        const store = db.createObjectStore('history', {
            keyPath: 'id',
        });
        store.createIndex('boardIdIndex', 'boardId', {
            multiEntry: true,
        });
    }
    // Add more createObjectStore statements here
};

const useDBStore = <T extends StoreName>(storeName: T) => {
    const [db, setDB] = useState<IDBPDatabase<DayplannerDB> | null>(null);

    const initDB = async () => {
        const database = await openDB<DayplannerDB>(dbName, dbVersion, {
            upgrade(db) {
                upgradeDB(db);
            },
        });
        setDB(database);
    };

    useEffect(() => {
        void initDB();
    }, []);

    const addData = async (data: DayplannerDB[T]['value']) => {
        if (db != null) {
            try {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                await store.add(data);
                return data;
            } catch (error) {
                console.error('Failed to add data to the database.', error);
            }
        }
        return null;
    };

    const getData = async (id: string) => {
        if (db != null) {
            try {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const data = await store.get(id);
                return data ?? null;
            } catch (error) {
                console.error('Failed to get data from the database.', error);
            }
        }
        return null;
    };

    const getDataByIndex = async (indexName: any, queryValue: any) => {
        if (db != null) {
            try {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const index = store.index(indexName);
                const data = await index.getAll(queryValue);
                return data ?? null;
            } catch (error) {
                console.error(
                    'Failed to get data from the database using index.',
                    error
                );
            }
        }
        return null;
    };

    const deleteData = async (id: string) => {
        if (db != null) {
            try {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                await store.delete(id);
            } catch (error) {
                console.error(
                    'Failed to delete data from the database.',
                    error
                );
            }
        }
    };

    return {
        addData,
        getData,
        getDataByIndex,
        deleteData,
    };
};

export const useDayplannerDB = <T extends StoreName>(storeName: T) => {
    return useDBStore(storeName);
};
