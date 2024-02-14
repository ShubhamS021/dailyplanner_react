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

    /**
     * Signs up a user with the given credentials.
     *
     * @param credentials - The user credentials for signup.
     * @returns A promise that resolves with the auth response.
     */
    const signUp = async (
        credentials: SignUpWithPasswordCredentials
    ): Promise<AuthResponse> => {
        return await auth.signUp(credentials);
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
        return await auth.signInWithPassword(credentials);
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
        return await auth.signInWithOAuth(credentials);
    };

    const getUser = async () => {
        return await auth.getUser();
    };

    const value = useMemo(
        () => ({
            signUp,
            signInWithPassword,
            signInWithOAuth,
            getUser,
        }),
        [signUp, signInWithPassword, signInWithOAuth, getUser]
    );

    return value;
};
