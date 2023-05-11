import {
    card,
    card2,
    card3,
    cardExtended,
    cardExtendedUpdate,
} from '../mocks/cards.mock';
import {
    createCustomBoard,
    createCustomLabels,
    createStandardBoard,
    deleteAllBoards,
    deleteFirstBoard,
    enterBoard,
    returnToBoards,
} from '../utils/board.util';
import {
    checkCard,
    createCard,
    createCards,
    editCard,
    moveCard,
    moveCardToBoard,
    removeCard,
    removeCards,
} from '../utils/lane.util';

describe('lane testing', () => {
    it('creating and deleting a card', () => {
        cy.visit('http://localhost:8080');
        createStandardBoard();

        createCard(card);
        checkCard(card);
        removeCard(card);

        returnToBoards();
        deleteFirstBoard();
    });

    it('creating, editing and deleting a card with many details', () => {
        cy.visit('http://localhost:8080');
        createStandardBoard();

        createCard(cardExtended);
        checkCard(cardExtended);

        editCard(cardExtended, cardExtendedUpdate);
        checkCard(cardExtendedUpdate);

        removeCard(cardExtended);

        returnToBoards();
        deleteFirstBoard();
    });

    it('creating multiple cards and moving them around', () => {
        cy.visit('http://localhost:8080');
        createStandardBoard();

        createCards([card, card2, card3]);

        // Moving every card through all lanes
        [card, card2, card3].forEach((card) => {
            [2, 3, 4].forEach((lane) => {
                moveCard(card, lane);
                cy.wait(1000);
            });
        });

        removeCards([card, card2, card3]);

        returnToBoards();
        deleteFirstBoard();
    });

    it('creating and moving a card to a different board', () => {
        cy.visit('http://localhost:8080');

        createCustomBoard('Board 1', 'First board');
        const customLabels = ['New', 'Doing', 'Finished'];
        createCustomLabels(customLabels);

        returnToBoards();

        cy.get('[data-testid="myboards-create-own-button"]').click();
        createCustomBoard('Board 2', 'Second board');
        createCustomLabels(customLabels);

        createCard(card);
        moveCardToBoard(card, 'Board 1');

        returnToBoards();
        enterBoard('Board 1');
        checkCard(card);

        returnToBoards();
        deleteAllBoards();
    });
});
