describe('Home Page', () => {
  it('Cela devrait afficher le titre correct', () => {
      cy.visit('/'); 
      cy.contains('Mon application de produits'); 
  });
});