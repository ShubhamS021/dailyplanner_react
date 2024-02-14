import { openDB, type IDBPDatabase } from 'idb';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
    const [loading, setLoading] = useState(true);

    const initDB = useCallback(async () => {
        try {
            const database = await openDB<DayplannerDB>(dbName, dbVersion, {
                upgrade(db) {
                    upgradeDB(db);
                },
            });

            return database;
        } catch (error) {
            console.error('Failed to initialize the database.', error);
        }
        return null;
    }, []);

    useEffect(() => {
        initDB()
            .then((database) => {
                setDB(database);
                setLoading(false);
            })
            .catch(console.error);
    }, [initDB]);

    const addData = useCallback(
        async (data: DayplannerDB[T]['value']) => {
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
        },
        [db, storeName]
    );

    const getData = useCallback(
        async (id: string) => {
            if (db != null) {
                try {
                    const tx = db.transaction(storeName, 'readonly');
                    const store = tx.objectStore(storeName);
                    const data = await store.get(id);
                    return data ?? null;
                } catch (error) {
                    console.error(
                        'Failed to get data from the database.',
                        error
                    );
                }
            }
            return null;
        },
        [db, storeName]
    );

    const getDataByIndex = useCallback(
        async (
            indexName: any,
            queryValue: IDBKeyRange | IDBValidKey | null | undefined
        ) => {
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
        },
        [db, storeName]
    );

    const deleteData = useCallback(
        async (id: string) => {
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
        },
        [db, storeName]
    );

    const value = useMemo(
        () => ({
            loading,
            addData,
            getData,
            getDataByIndex,
            deleteData,
        }),
        [loading, addData, getData, getDataByIndex, deleteData]
    );

    return value;
};

export const useDayplannerDB = <T extends StoreName>(storeName: T) => {
    return useDBStore(storeName);
};
