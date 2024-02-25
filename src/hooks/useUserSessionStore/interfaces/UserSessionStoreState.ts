import { type Session, type User } from '@supabase/supabase-js';

export interface UserSessionStoreState {
    session: Session | null;
    user: User | undefined;
}
