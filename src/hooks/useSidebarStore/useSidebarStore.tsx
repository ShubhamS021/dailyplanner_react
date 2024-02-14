import { create } from 'zustand';
import { SidebarStoreActions } from './interfaces/SidebarStoreActions';
import { SidebarStoreState } from './interfaces/SidebarStoreState';

export const useSidebarStore = create<SidebarStoreActions & SidebarStoreState>(
    (set) => ({
        isOpen: true,

        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    })
);
