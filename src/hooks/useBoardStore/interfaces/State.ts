import { type Board } from 'interfaces/Board';
import { type BoardMode } from 'types/BoardMode';
import { type ThemeMode } from 'types/ThemeMode';

export interface State {
    boards: Board[];
    board: Board;
    compactMode: boolean;
    themeMode: ThemeMode;
    boardMode: BoardMode;
}
