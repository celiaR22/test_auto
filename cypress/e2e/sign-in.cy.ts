describe('Sign In Form', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Devrais mettre le boutton valider en enable quand le formulaire est valide', () => {
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password1!');
        cy.get('input[formControlName="confirmPassword"]').type('Password1!');
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="postalCode"]').type('75000');
        cy.contains('button', 'Valider').should('not.be.disabled');
    });

    it('Devrais disable le boutton valider quand le formulaire est invalide', () => {
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password1!');
        cy.get('input[formControlName="confirmPassword"]').type('Password1!');
        cy.contains('button', 'Valider').should('be.disabled');
    });

    it('Devrais afficher ou cacher le mot de passe quand on clique sur l\'icone de visibilité', () => {
        const passwordInput = 'input[formControlName="password"]';
        const passwordValue = 'Password123!';
        cy.get(passwordInput).type(passwordValue);
        cy.get(passwordInput).should('have.attr', 'type', 'password');
        cy.contains('button', 'visibility').click();
        cy.get(passwordInput).should('have.attr', 'type', 'text');
        cy.contains('button', 'visibility').click();
        cy.get(passwordInput).should('have.attr', 'type', 'password');
    });


    it('Devrais afficher une erreur sur le  champ du code postal si la valeur est incorrecte, et aucune erreur si la valeur est correcte', () => {
        const postalCodeInput = 'input[formControlName="postalCode"]';
        cy.get(postalCodeInput).type('123');
        cy.get(postalCodeInput).blur();
        cy.contains('.mat-error', 'Le code postal n\'est pas valide.').should('be.visible');
        cy.get(postalCodeInput).type('00');
        cy.contains('.mat-error', 'Le code postal n\'est pas valide.').should('not.exist');
    });

    it('Devrais rediriger sur la page accueil si le formulaire est valider et valide', () => {
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password123!');
        cy.get('input[formControlName="confirmPassword"]').type('Password123!');
        cy.get('input[formControlName="postalCode"]').type('12345');
        cy.contains('button', 'Valider').click();
        cy.url().should('include', '/home');
    });

    it('Devrais afficher ou cacher le boutton de reset du champ nom si il est remplis', () => {
        const lastnameInputSelector = 'input[formControlName="lastname"]';
        const resetButtonSelector = 'button[aria-label="Clear"]';
        cy.get(lastnameInputSelector).should('have.value', '');
        cy.get(resetButtonSelector).should('not.exist');
        cy.get(lastnameInputSelector).type('Guichon');
        cy.get(resetButtonSelector).should('exist');
        cy.get(resetButtonSelector).click();
        cy.get(lastnameInputSelector).should('have.value', '');
        cy.get(resetButtonSelector).should('not.exist');
    });

    it('Devrais afficher ou cacher le boutton de reset du champ prénom si il est remplis', () => {
        const firstnameInputSelector = 'input[formControlName="firstname"]';
        const resetButtonSelector = 'button[aria-label="Clear"]';
        cy.get(firstnameInputSelector).should('have.value', '');
        cy.get(resetButtonSelector).should('not.exist');
        cy.get(firstnameInputSelector).type('Max');
        cy.get(resetButtonSelector).should('exist');
        cy.get(resetButtonSelector).click();
        cy.get(firstnameInputSelector).should('have.value', '');
        cy.get(resetButtonSelector).should('not.exist');
    });
});
