import { Session, User } from '@supabase/supabase-js';

export interface UserSessionStoreState {
    session: Session | null;
    user: User | undefined;
}
