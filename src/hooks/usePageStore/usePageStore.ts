import { type PageStoreActions } from '@/hooks/usePageStore/interfaces/PageStoreActions';
import { type PageStoreState } from '@/hooks/usePageStore/interfaces/PageStoreState';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { AppPage } from './types/AppPage';

export const usePageStore = create<PageStoreState & PageStoreActions>()(
    devtools(
        persist(
            (set) => ({
                page: 'boardChoosePage' as AppPage,

                setPage: (page: AppPage) => {
                    set((state) => {
                        return { ...state, page };
                    });
                },
            }),
            {
                name: 'page-store',
                version: 1,
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
