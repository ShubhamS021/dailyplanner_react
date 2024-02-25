import { useUserSessionStore } from '@/hooks/useUserSessionStore/useUserSessionStore';
import {
    AuthResponse,
    AuthTokenResponsePassword,
    OAuthResponse,
    SignInWithOAuthCredentials,
    SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useMemo } from 'react';
import { useSupabase } from '../useSuperbase/useSuperbase';

export const useSupabaseAuth = () => {
    const { auth } = useSupabase();
    const { setUser, setSession } = useUserSessionStore();

    const getURL = () => {
        let url =
            process?.env?.VITE_PUBLIC_SITE_URL ?? 'http://localhost:8080/';

        url = url.includes('http') ? url : `https://${url}`;
        url = url.endsWith('/') ? url : `${url}/`;

        return url;
    };

    /**
     * Signs up a user with the given credentials.
     *
     * @param credentials - The user credentials for signup.
     * @returns A promise that resolves with the auth response.
     */
    const signUp = async (
        credentials: SignUpWithPasswordCredentials
    ): Promise<AuthResponse> => {
        const resposne = await auth.signUp(credentials);
        await handleUser();
        return resposne;
    };

    /**
     * Signs in a user with the given credentials.
     *
     * @param credentials - The user credentials to sign in with.
     * @returns A promise that resolves with the auth token response.
     */
    const signInWithPassword = async (
        credentials: SignUpWithPasswordCredentials
    ): Promise<AuthTokenResponsePassword> => {
        const response = await auth.signInWithPassword(credentials);
        await handleUser();
        return response;
    };

    /**
     * Signs in a user with OAuth credentials.
     *
     * @param credentials - The OAuth credentials to sign in with.
     * @returns A promise that resolves with the OAuth response.
     */
    const signInWithOAuth = async (
        credentials: SignInWithOAuthCredentials
    ): Promise<OAuthResponse> => {
        const response = await auth.signInWithOAuth({
            ...credentials,
            options: { redirectTo: getURL() },
        });
        await handleUser();
        return response;
    };

    /*
     * Handles the user session.
     */
    const handleUser = async () => {
        const authSession = await auth.getSession();
        if (authSession != null) {
            setSession(authSession.data.session);
            const user = authSession.data.session?.user;

            if (user !== undefined) {
                setUser(user);
            }
        }
    };

    return useMemo(
        () => ({
            signUp,
            signInWithPassword,
            signInWithOAuth,
        }),
        [signUp, signInWithPassword, signInWithOAuth]
    );
};
