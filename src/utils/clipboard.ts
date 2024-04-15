import { writeText } from '@tauri-apps/api/clipboard';

export const writeToClipboards = async (value: string) => {
    if (
        Object.prototype.hasOwnProperty.call(window, '__TAURI_IPC__') === true
    ) {
        await writeText(value); // tauri clipboard API
    }

    await navigator.clipboard.writeText(value); // web clipboard API
};
