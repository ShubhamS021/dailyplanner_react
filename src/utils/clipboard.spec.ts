import { writeText } from '@tauri-apps/api/clipboard';
import { vitest } from 'vitest';
import { writeToClipboards } from './clipboard';

vitest.mock('@tauri-apps/api/clipboard', () => ({
    writeText: vitest.fn(),
}));

Object.assign(navigator, {
    clipboard: {
        writeText: vitest.fn(),
    },
});

describe('writeToClipboards', () => {
    afterEach(() => {
        vitest.clearAllMocks();
    });

    it('should call tauri clipboard API if available', () => {
        (window as any).__TAURI_IPC__ = true;
        const value = 'Test value';

        void writeToClipboards(value).then(() => {
            expect(writeText).toHaveBeenCalledWith(value);
        });
    });

    it('should call web clipboard API if tauri clipboard API is not available', () => {
        (window as any).__TAURI_IPC__ = false;
        const value = 'Test value';

        expect(writeText).not.toHaveBeenCalled();

        void writeToClipboards(value).then(() => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(value);
        });
    });
});
