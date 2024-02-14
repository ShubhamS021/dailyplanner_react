import { type Card } from '@/interfaces/Card';

/**

Creates multiple cards.
@param {Card[]} cards - An array of cards to be created.
*/
export const createCards = (cards: Card[]) => {
    cards.forEach((card) => {
        createCard(card);
    });
};

/**

Creates a card.
@param {Card} card - The card object containing the card details.
*/
export const createCard = (card: Card) => {
    cy.get('[data-testid="addcard-input"]').type(card.title);
    cy.get('[data-testid="addcard-button"]').click();

    if (card.description !== undefined) {
        cy.get('[data-testid="addcard-description-input"]').type(
            card.description
        );
    }

    if (card.tasks !== undefined && card.tasks?.length > 0) {
        card.tasks.forEach((task) => {
            cy.get('[data-testid="addcard-subtask-input"]').type(
                task.description
            );
            cy.get('[data-testid="addcard-subtask-button"]').click();
        });
    }

    if (card.upperTags !== undefined && card.upperTags?.length > 0) {
        card.upperTags.forEach((tag) => {
            cy.get('[data-testid="addcard-tags-input"]').type(tag.text);
            cy.get('[data-testid="addcard-tag-button"]').click();
        });
    }

    cy.get('[data-testid="addcard-modal-button"]').click();
};

/**

Checks the details of a card.
@param {Card} card - The expected card object.
*/
export const checkCard = (card: Card) => {
    cy.get(`[data-testid="card-${card.id}"]`).as('card');

    if (card.upperTags !== null && card.upperTags !== undefined) {
        cy.get('@card')
            .find('[data-testid="card-tags"]')
            .should('have.length', card.upperTags.length);
    }

    cy.get('@card')
        .find('[data-testid="card-title"]')
        .should('have.text', card.title);

    if (card.description !== undefined) {
        cy.get('@card')
            .find('[data-testid="card-description"]')
            .should('have.text', card.description);
    }

    if (card.tasks !== undefined && card.tasks?.length > 0) {
        cy.get('[data-testid="card-task"]').as('tasks');
        card.tasks.forEach((task, index) => {
            cy.get('@tasks').eq(index).should('have.text', task.description);
        });
    }
};

/**

Removes multiple cards.
@param {Card[]} cards - An array of cards to be removed.
*/
export const removeCards = (cards: Card[]) => {
    cards.forEach((card) => {
        removeCard(card);
    });
};

/**

Removes a card.
@param {Card} card - The card object to be removed.
*/
export const removeCard = (card: Card) => {
    cy.get(`[data-testid="card-${card.id}-actions"]`).as('card-actions');
    cy.get('@card-actions').invoke('removeClass', 'invisible');
    cy.get('@card-actions').find('[data-testid="remove-card-button"]').click();
};

/**

Moves a card to a specified lane.
@param {Card} card - The card object to be moved.
@param {number} laneId - The ID of the target lane where the card will be moved.
*/
export const moveCard = (card: Card, laneId: number) => {
    cy.get(`[data-testid="card-${card.id}"]`).drag(
        `[data-rbd-droppable-id="${laneId}"]`
    );
};

/**

Edits a card with updated card details.
@param {Card} card - The original card object to be edited.
@param {Card} cardUpdate - The updated card object containing the changes.
*/
export const editCard = (card: Card, cardUpdate: Card) => {
    cy.get(`[data-testid="card-${card.id}-actions"]`).as('card-actions');
    cy.get('@card-actions').invoke('removeClass', 'invisible');
    cy.get('@card-actions').find('[data-testid="edit-card-button"]').click();

    // update title
    cy.get('[data-testid="addcard-title-input"]')
        .clear()
        .type(cardUpdate.title);
    // update description
    if (
        cardUpdate.description !== null &&
        cardUpdate.description !== undefined
    ) {
        cy.get('[data-testid="addcard-description-input"]').as('description');
        cy.get('@description').clear();
        cy.get('@description').type(cardUpdate.description, {
            force: true,
        });
    }

    // update tasks
    if (cardUpdate.tasks !== undefined && cardUpdate.tasks?.length > 0) {
        // check existing tasks for deletion
        const tasks = cy
            .get('[data-testid="card-edit-tasks"]')
            .find('[data-testid="card-task"]')
            .children();

        tasks.each((task) => {
            const taskdescription = task
                .find('.task-description')
                .val() as string;

            const updateTasks = cardUpdate.tasks?.flatMap(
                (task) => task.description
            );
            if (!(updateTasks?.includes(taskdescription) ?? false)) {
                cy.wrap(task)
                    .find(`[data-testid="task-remove-button"]`)
                    .click();
            }
        });

        // create new tasks
        cardUpdate.tasks.forEach((task) => {
            cy.get('[data-testid="addcard-subtask-input"]').type(
                task.description
            );
            cy.get('[data-testid="addcard-subtask-button"]').click();
        });
    }

    // update tags
    if (card.upperTags !== undefined && card.upperTags?.length > 0) {
        // check existing tasks for deletion
        const tags = cy.get('[data-testid="card-edit-tags"]').children();

        tags.each((tag) => {
            const tagtext = tag.find('.tag-description').val() as string;

            const updateTags = cardUpdate.upperTags?.flatMap(
                (task) => task.text
            );

            if (!(updateTags?.includes(tagtext) ?? false)) {
                cy.wrap(tag).find('[data-testid="tag-remove-button"]').click();
            }
        });

        // create new tags
        card.upperTags.forEach((tag) => {
            cy.get('[data-testid="addcard-tags-input"]').type(tag.text);
            cy.get('[data-testid="addcard-tag-button"]').click();
        });
    }

    cy.get('[data-testid="addcard-modal-button"]').click();
};

/**

Moves a card to a specific board.
@param {Card} card - The card object to be moved.
@param {string} boardtitle - The title of the target board where the card will be moved.
*/
export const moveCardToBoard = (card: Card, boardtitle: string) => {
    cy.get(`[data-testid="card-${card.id}-actions"]`).as('card-actions');
    cy.get('@card-actions').invoke('removeClass', 'invisible');
    cy.get('@card-actions').find('[data-testid="move-card-button"]').click();

    cy.get('[data-testid="board-selection"]').select(boardtitle);
    cy.get('[data-testid="confirmation-modal-button"]').click();
};
