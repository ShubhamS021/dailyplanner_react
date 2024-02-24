import { Session, User } from '@supabase/supabase-js';

export interface UserSessionStoreActions {
    setSession: (session: Session | null) => void;
    setUser: (user: User | undefined) => void;
}
