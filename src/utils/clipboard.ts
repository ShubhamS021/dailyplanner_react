import { writeText } from '@tauri-apps/api/clipboard';

export const writeToClipboards = async (value: string) => {
    if (Object.hasOwn(window, '__TAURI_IPC__')) {
        await writeText(value); // tauri clipboard API
    }

    await navigator.clipboard.writeText(value); // web clipboard API
};
