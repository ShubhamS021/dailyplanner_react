/**

Check if the given labels match the board lane labels in the DOM.

@param {string[]} labels - An array of string labels to compare against the board lane labels

@returns {void}
*/
export const checkBoardLabels = (labels: string[]) => {
    cy.get('[data-testid="page-label"]').as('laneLabels');

    cy.get('@laneLabels').should('have.length', labels.length);

    cy.get('@laneLabels').each(($label, index) => {
        cy.wrap($label).should('have.text', labels[index]);
    });
};

/**

Clicks on the "Back to Boards" button to return to the boards page.
@returns {void}
*/
export const returnToBoards = () => {
    cy.get('[data-testid="btnBackToBoards"]').click();
};

/**

Deletes the first board from the list of boards.
@returns {void}
*/
export const deleteFirstBoard = () => {
    cy.get('[data-testid="board-0-actions"]').invoke(
        'removeClass',
        'invisible'
    );
    cy.get('[data-testid="remove-board-button"]').click();
    cy.get('[data-testid="confirmation-modal-button"]').click();
};

/**

Creates a new standard board with 4 lanes.
@returns {void}
*/
export const createStandardBoard = () => {
    cy.get('[data-testid="addboard-create-standard-button"]').as(
        'btnCreateStandard'
    );
    cy.get('@btnCreateStandard').click();
};

/**
Creates a new custom board with the specified title and description.

@param {string} title - The title of the new custom board.

@param {string} description - The description of the new custom board.

@returns {void}
*/
export const createCustomBoard = (title: string, description: string) => {
    cy.get('[data-testid="addboard-enter-name-input"]').as('title');
    cy.get('[data-testid="addboard-enter-description-input"]').as(
        'description'
    );

    cy.get('@title').type(title);
    cy.get('@description').type(description);

    cy.get('[data-testid="addboard-create-own-button"]').as('btnCreate');
    cy.get('@btnCreate').click();
};

/**

Creates new custom labels on the board with the specified names.

@param {string[]} customLabels - An array of strings representing the names of the custom labels to create.

@returns {void}
*/
export const createCustomLabels = (customLabels: string[]) => {
    cy.get('[data-testid="myboardlanes-addlane-button"]').as('btnAddLane');
    cy.get('[data-testid="myboardlanes-lanename-input"]').as('lanename');
    cy.get('[data-testid="myboardlanes-lane-color-button"]').as('colorTags');

    customLabels.forEach((label, index) => {
        cy.get('@lanename').type(label);
        cy.get('@btnAddLane').click();
        cy.get('@colorTags')
            .eq(index + 1)
            .click();
    });

    cy.get('[data-testid="myboardlanes-create-own-button"]').click();
};
