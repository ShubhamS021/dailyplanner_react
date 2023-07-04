import { card } from '../../__mocks__/cards.mock';
import {
    saveBoardMovementToHistory,
    saveCreationToHistory,
    saveDeletionToHistory,
    saveMovementToHistory,
    saveUpdateToHistory,
} from './history.util';

import { addData } from './indexdb.util';

// Mock the addData function from indexdb.util
jest.mock('./indexdb.util', () => ({
    IDBStores: { History: 'History' },
    addData: jest.fn(),
}));

describe('saveDeletionToHistory', () => {
    it('should save a deletion event to the history', () => {
        const mockAddData = addData;

        saveDeletionToHistory(card, 1);

        expect(mockAddData).toHaveBeenCalledWith('History', {
            boardId: 1,
            id: expect.any(Number),
            type: 'DELETION',
            data: { card },
        });
    });
});

describe('saveUpdateToHistory', () => {
    it('should save an update event to the history', () => {
        const mockAddData = addData;

        saveUpdateToHistory(card, 1);

        expect(mockAddData).toHaveBeenCalledWith('History', {
            boardId: 1,
            id: expect.any(Number),
            type: 'UPDATE',
            data: { card },
        });
    });
});

describe('saveCreationToHistory', () => {
    it('should save a creation event to the history', () => {
        const mockAddData = addData;

        saveCreationToHistory(card, 1);

        expect(mockAddData).toHaveBeenCalledWith('History', {
            boardId: 1,
            id: expect.any(Number),
            type: 'CREATION',
            data: { card },
        });
    });
});

describe('saveMovementToHistory', () => {
    it('should save a movement event to the history', () => {
        const laneStart = 1;
        const laneEnd = 2;
        const mockAddData = addData;

        saveMovementToHistory(card, 1, laneStart, laneEnd);

        expect(mockAddData).toHaveBeenCalledWith('History', {
            boardId: 1,
            id: expect.any(Number),
            type: 'MOVEMENT',
            data: { card, laneStart, laneEnd },
        });
    });
});

describe('saveBoardMovementToHistory', () => {
    it('should save a board movement event to the history', () => {
        const boardStart = 1;
        const boardEnd = 2;
        const mockAddData = addData;

        saveBoardMovementToHistory(card, 1, boardStart, boardEnd);

        expect(mockAddData).toHaveBeenCalledWith('History', {
            boardId: 1,
            id: expect.any(Number),
            type: 'BOARDMOVEMENT',
            data: { card, boardStart, boardEnd },
        });
    });
});
