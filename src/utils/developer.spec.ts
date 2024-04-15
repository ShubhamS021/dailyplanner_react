import { vitest } from 'vitest';
import { onCLS, onFID, onLCP } from 'web-vitals/attribution';
import { logViteEnvironment, logWebVitals } from './developer';

vitest.mock('web-vitals/attribution', () => ({
    onCLS: vitest.fn(),
    onFID: vitest.fn(),
    onLCP: vitest.fn(),
}));

describe('logViteEnvironment', () => {
    it('should log environment variables when VITE_ENVIRONMENT_NAME is "qa"', async () => {
        const consoleGroupMock = vitest.spyOn(console, 'group');
        const consoleTableMock = vitest.spyOn(console, 'table');
        const consoleGroupEndMock = vitest.spyOn(console, 'groupEnd');

        process.env.VITE_ENVIRONMENT_NAME = 'qa';

        await logViteEnvironment();

        expect(consoleGroupMock).toHaveBeenCalledWith(
            'VITE_ENV (only visible in qa and dev)'
        );
        expect(consoleTableMock).toHaveBeenCalledWith({
            VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
            VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
            VITE_PUBLIC_SITE_URL: import.meta.env.VITE_PUBLIC_SITE_URL,
            VITE_ENVIRONMENT_NAME: import.meta.env.VITE_ENVIRONMENT_NAME,
        });
        expect(consoleGroupEndMock).toHaveBeenCalled();
    });

    it('should not log environment variables when VITE_ENVIRONMENT_NAME is not "qa" or "dev"', async () => {
        const consoleGroupMock = vitest.spyOn(console, 'group');
        const consoleTableMock = vitest.spyOn(console, 'table');
        const consoleGroupEndMock = vitest.spyOn(console, 'groupEnd');

        process.env.VITE_ENVIRONMENT_NAME = 'production';

        await logViteEnvironment();

        expect(consoleGroupMock).not.toHaveBeenCalled();
        expect(consoleTableMock).not.toHaveBeenCalled();
        expect(consoleGroupEndMock).not.toHaveBeenCalled();
    });
});

describe('logWebVitals', () => {
    it('should log web vitals when VITE_ENVIRONMENT_NAME is "qa"', async () => {
        process.env.VITE_ENVIRONMENT_NAME = 'qa';

        const consoleGroupMock = vitest.spyOn(console, 'group');
        const consoleLogMock = vitest.spyOn(console, 'log');

        await logWebVitals();

        expect(consoleGroupMock).toHaveBeenCalledWith('Web Vitals');
        expect(onCLS).toHaveBeenCalledWith(consoleLogMock);
        expect(onFID).toHaveBeenCalledWith(consoleLogMock);
        expect(onLCP).toHaveBeenCalledWith(consoleLogMock);
        expect(console.groupEnd).toHaveBeenCalled();
    });

    // TODO: meta.env not recognized
    it.skip('should not log web vitals when VITE_ENVIRONMENT_NAME is not "qa" or "dev"', async () => {
        import.meta.env.VITE_ENVIRONMENT_NAME = 'production';

        const consoleGroupMock = vitest.spyOn(console, 'group');

        await logWebVitals();

        expect(consoleGroupMock).not.toHaveBeenCalled();
        expect(onCLS).not.toHaveBeenCalled();
        expect(onFID).not.toHaveBeenCalled();
        expect(onLCP).not.toHaveBeenCalled();
        expect(console.groupEnd).not.toHaveBeenCalled();
    });
});
