describe('Home Page', () => {
  it('Cela devrait afficher le titre correct', () => {

    const fakeData = [
      { id: 1, creationDate: new Date('2023-06-01'), productName: 'Produit 1', stock: 10, detailProduct: { description: 'Description 1', color: 'Rouge', price: 100 } },
      { id: 2, creationDate: new Date('2023-06-02'), productName: 'Produit 2', stock: 5, detailProduct: { description: 'Description 2', color: 'Bleu', price: 150 } }
    ];
    cy.intercept('GET', 'http://localhost:3502/product/', fakeData).as('getData');
    cy.visit('/home');
    cy.wait('@getData');
    cy.contains('Mon application de produits');
  });
});