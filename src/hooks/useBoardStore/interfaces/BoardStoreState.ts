import { type Board } from '@/interfaces/Board';
import { type ThemeMode } from '@/types/ThemeMode';

export interface BoardStoreState {
    boards: Board[];
    board: Board;
    compactMode: boolean;
    themeMode: ThemeMode;
}
