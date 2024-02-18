import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { SidebarStoreActions } from './interfaces/SidebarStoreActions';
import { SidebarStoreState } from './interfaces/SidebarStoreState';

export const useSidebarStore = create<
    SidebarStoreActions & SidebarStoreState
>()(
    devtools(
        persist(
            (set) => ({
                isOpen: true,

                toggle: () => set((state) => ({ isOpen: !state.isOpen })),
            }),
            {
                name: 'sidebar-store',
                version: 1,
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
