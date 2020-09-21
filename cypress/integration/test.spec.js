/// <reference types="cypress" />

import DataService from "../../src/DataService"

describe('Basic test', () => {

    const NEW_ITEM = 'New item';
    const TEST_ITEM = 'Learn React';
    const TEST_ITEM_2 = 'Have lunch';

    // handle uncaught exceptions
    // this deals with the unexpected symbol '<' problem
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
    })

    before(() => {

        //remove all existing todos and replace with our test data
        DataService.getAll()
        .then(response => {
            var todos = response.data;
            todos.map((todo, index) => {
                DataService.remove(todo.id);
            })
        })
        .then(response => {
            DataService.create({ id: 1, text: "Learn React", isCompleted: false });
            DataService.create({ id: 2, text: "Have lunch", isCompleted: false });
            DataService.create({ id: 3, text: "Write React app", isCompleted: false });
        })
    })

    it('has 3 elements on startup', () => {
        cy.visit(Cypress.env('URL'));
        cy.get('[data-cy=todo-list]').children('.todo').should('have.length', 3);
        cy.contains('Learn React');
        cy.contains('Have lunch');
        cy.contains('Write React app');
    })

    it('can add a new todo item', () => {
        cy.get('[data-cy=todo-list]').find('input').type(NEW_ITEM).type('{enter}').click();
        cy.get('[data-cy=todo-list]').children('.todo').should('have.length', 4);
        cy.contains(NEW_ITEM);
    })

    it('can mark a todo item as complete', () => {
        cy.get('[data-cy=todo]').contains(TEST_ITEM).contains('Complete').click();
        cy.get('[data-cy=todo-list]').children('.todo').should('have.length', 4);
        cy.contains(TEST_ITEM).should('have.attr', 'style', 'text-decoration: line-through;');
    })

    it('can delete a todo item', () => {
        cy.get('[data-cy=todo]').contains(TEST_ITEM_2).contains('X').click();
        cy.get('[data-cy=todo-list]').children('.todo').should('have.length', 3);
        cy.contains(TEST_ITEM_2).should('not.exist');
    })

})

