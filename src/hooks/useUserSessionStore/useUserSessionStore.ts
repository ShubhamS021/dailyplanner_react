import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type UserSessionStoreActions } from './interfaces/UserSessionStoreActions';
import { type UserSessionStoreState } from './interfaces/UserSessionStoreState';

const initialState = {
    session: null,
    user: undefined,
};

export const useUserSessionStore = create<
    UserSessionStoreState & UserSessionStoreActions
>()(
    devtools((set) => ({
        ...initialState,

        setSession(session) {
            set((state) => {
                return {
                    ...state,
                    session,
                };
            });
        },

        setUser(user) {
            set((state) => {
                return {
                    ...state,
                    user,
                };
            });
        },
    }))
);
