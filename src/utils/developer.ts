export const logViteEnvironment = () => {
    // Only log in qa and dev environments
    if (
        !(
            import.meta.env.VITE_ENVIRONMENT_NAME === 'qa' ||
            import.meta.env.VITE_ENVIRONMENT_NAME === 'dev'
        )
    ) {
        return;
    }

    console.groupCollapsed('VITE_ENV (only visible in qa and dev)');

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
