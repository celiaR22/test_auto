/// <reference types="cypress" />

describe('Composant Grille de Produits', () => {
  beforeEach(() => {
    const fakeData = [
      { id: 1, creationDate: new Date('2023-06-01'), productName: 'Produit 1', stock: 10, detailProduct: { description: 'Description 1', color: 'Rouge', price: 100 } },
      { id: 2, creationDate: new Date('2023-06-02'), productName: 'Produit 2', stock: 5, detailProduct: { description: 'Description 2', color: 'Bleu', price: 150 } }
    ];

    cy.intercept('GET', 'http://localhost:3502/product/', fakeData).as('getData');
    cy.visit('/home');
    cy.wait('@getData');
  });

  it('devrait afficher correctement les en-têtes de la table', () => {
    cy.get('.mat-header-row th').should('have.length', 7);
    cy.get('.mat-header-cell').eq(0).should('contain', 'ID');
    cy.get('.mat-header-cell').eq(1).should('contain', 'Date de Création');
    cy.get('.mat-header-cell').eq(2).should('contain', 'Nom du Produit');
    cy.get('.mat-header-cell').eq(3).should('contain', 'Stock');
    cy.get('.mat-header-cell').eq(4).should('contain', 'Description');
    cy.get('.mat-header-cell').eq(5).should('contain', 'Couleur');
    cy.get('.mat-header-cell').eq(6).should('contain', 'Prix');
  });

  it('devrait afficher les données des produits dans la table', () => {
    cy.get('.mat-row').should('have.length.gt', 0);
  });

  it('devrait avoir des données correctes dans chaque cellule', () => {
    cy.get('.mat-cell').eq(1).invoke('text').should('match', /\d{2}\/\d{2}\/\d{4}/);
    cy.get('.mat-cell').eq(2).invoke('text').should('not.be.empty');
    cy.get('.mat-cell').eq(3).invoke('text').should('match', /^\s*\d+\s*$/);
    cy.get('.mat-cell').eq(4).invoke('text').should('not.be.empty');
    cy.get('.mat-cell').eq(5).invoke('text').should('not.be.empty');
    cy.get('.mat-cell').eq(6).invoke('text').should('match', /€\d+(\.\d{1,2})?/);
  });
});
