import { onCLS, onFID, onLCP } from 'web-vitals/attribution';

/**
 * Logs information about the Vite environment variables to the console, but only when in the 'qa' or 'dev' environments.
 *
 * Logs a collapsed group with the environment variable names and values in a table. Useful for debugging the runtime
 * environment during local development. Not logged in prod to avoid leaking sensitive values.
 */
export const logViteEnvironment = async () => {
    if (
        !(
            import.meta.env.VITE_ENVIRONMENT_NAME === 'qa' ||
            import.meta.env.VITE_ENVIRONMENT_NAME === 'dev'
        )
    ) {
        return;
    }

    console.group('VITE_ENV (only visible in qa and dev)');

    const envVariables: Array<Record<string, string>> = [
        {
            name: 'VITE_SUPABASE_URL',
            value: import.meta.env.VITE_SUPABASE_URL,
        },
        {
            name: 'VITE_SUPABASE_ANON_KEY',
            value: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        {
            name: 'VITE_PUBLIC_SITE_URL',
            value: import.meta.env.VITE_PUBLIC_SITE_URL,
        },
        {
            name: 'VITE_ENVIRONMENT_NAME',
            value: import.meta.env.VITE_ENVIRONMENT_NAME,
        },
    ];

    const envVariablesNoIndex = envVariables.reduce<Record<string, string>>(
        (acc, { name, value }) => {
            acc[name] = value;
            return acc;
        },
        {}
    );

    console.table(envVariablesNoIndex);

    console.groupEnd();
};

export const logWebVitals = async () => {
    if (
        import.meta.env.VITE_ENVIRONMENT_NAME === 'qa' ||
        import.meta.env.VITE_ENVIRONMENT_NAME === 'dev'
    ) {
        console.group('Web Vitals');
        onCLS(console.log);
        onFID(console.log);
        onLCP(console.log);
        console.groupEnd();
    }
};

export const logDeveloperInfo = async () => {
    await logViteEnvironment();
    await logWebVitals();
};
