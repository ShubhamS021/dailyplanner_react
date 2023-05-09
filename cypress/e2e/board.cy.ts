import {
    checkBoardLabels,
    createCustomBoard,
    createCustomLabels,
    createStandardBoard,
    deleteFirstBoard,
    returnToBoards,
} from '../utils/board.util';

describe('board testing', () => {
    it('passes creating and deleting a standard board', () => {
        cy.visit('http://localhost:8080');

        // Create a board with standard settings
        createStandardBoard();

        const standardLabels = [
            'Not Started',
            'In Progress',
            'Blocked',
            'Done',
        ];

        // Check if board was correctly created
        checkBoardLabels(standardLabels);

        // Go back and cleanup board
        returnToBoards();
        deleteFirstBoard();

        cy.get('[data-testid="addboard-title"]').should('exist');
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

        cy.get('[data-testid="addboard-title"]').should('exist');
    });
});
