import { card } from '../mocks/cards.mock';
import {
    checkBoardLabels,
    createCustomBoard,
    createCustomLabels,
    createStandardBoard,
    deleteFirstBoard,
    returnToBoards,
} from '../utils/board.util';
import { checkCard, createCard } from '../utils/lane.util';

describe('board testing', () => {
    it('passes creating and deleting a standard board', () => {
        cy.visit('http://localhost:8080');

        // Create a board with standard settings
        createStandardBoard();

        const standardLabels = [
            'Nicht begonnen',
            'In Bearbeitung',
            'Blockiert',
            'Fertig',
        ];

        // Check if board was correctly created
        checkBoardLabels(standardLabels);

        // Go back and cleanup board
        returnToBoards();
        deleteFirstBoard();

        cy.get('[data-testid="board-add-title"]').should('exist');
    });

    it('passes creating and deleting a custom board', () => {
        cy.visit('http://localhost:8080');

        // Create a board with own settings
        createCustomBoard('My Testboard', 'A board for testing.');

        // Create 3 lanes with different colors
        const customLabels = ['New', 'Doing', 'Finished'];
        createCustomLabels(customLabels);

        // Check if board was correctly created
        checkBoardLabels(customLabels);

        // Go back and cleanup board
        returnToBoards();
        deleteFirstBoard();

        cy.get('[data-testid="board-add-title"]').should('exist');
    });

    it('passes creating, reloading multiple times and deleting a custom board', () => {
        cy.visit('http://localhost:8080');

        // Create a board with own settings
        createCustomBoard('My Testboard', 'A board for testing.');

        // Create 3 lanes with different colors
        const customLabels = ['New', 'Doing', 'Finished'];
        createCustomLabels(customLabels);

        // Check if board was correctly created
        checkBoardLabels(customLabels);
        createCard(card);

        const amountOfReloads = 5;
        for (let run = 0; run < amountOfReloads; run++) {
            cy.visit('http://localhost:8080');
            checkCard(card);
        }

        // Go back and cleanup board
        returnToBoards();
        deleteFirstBoard();

        cy.get('[data-testid="board-add-title"]').should('exist');
    });
});
