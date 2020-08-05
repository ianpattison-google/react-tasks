/// <reference types="cypress" />

describe('Basic test', () => {

    const NEW_ITEM = 'New item';
    const TEST_ITEM = 'Learn React';

    // handle uncaught exceptions
    // this deals with the unexpected symbol '<' problem
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
    })

    it('has 3 elements on startup', () => {
        cy.visit(Cypress.env('URL'));
        cy.get('[data-cy=my-todos]').children('.todo').should('have.length', 3);
        cy.contains('Learn React');
        cy.contains('Have lunch');
        cy.contains('Write React app');
    })

    it('can add a new todo item', () => {
        cy.get('[data-cy=my-todos]').find('input').type(NEW_ITEM).type('{enter}').click();
        cy.get('[data-cy=my-todos]').children('.todo').should('have.length', 4);
        cy.contains(NEW_ITEM);
    })

    it('can mark a todo item as complete', () => {
        cy.contains(TEST_ITEM).get('button').contains('Complete').click();
        cy.get('[data-cy=my-todos]').children('.todo').should('have.length', 4);
        cy.contains(TEST_ITEM).should('have.attr', 'style', 'text-decoration: line-through;');
    })

    it('can delete a todo item', () => {
        cy.contains(TEST_ITEM).get('button').contains('X').click();
        cy.get('[data-cy=my-todos]').children('.todo').should('have.length', 3);
        cy.contains(TEST_ITEM).should('not.exist');
    })

})

