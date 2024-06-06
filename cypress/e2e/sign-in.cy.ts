describe('Sign In Form', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should disable the submit button when the form is invalid', () => {
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password1!');
        cy.get('input[formControlName="confirmPassword"]').type('Password1!');
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="postalCode"]').type('75000');
        cy.contains('button', 'Valider').should('not.be.disabled');
    });

    it('should display or hide password when clicking on the visibility button', () => {
        const passwordInput = 'input[formControlName="password"]';
        const passwordValue = 'Password123!';
        cy.get(passwordInput).type(passwordValue);
        cy.get(passwordInput).should('have.attr', 'type', 'password');
        cy.contains('button', 'visibility').click();
        cy.get(passwordInput).should('have.attr', 'type', 'text');
        cy.contains('button', 'visibility').click();
        cy.get(passwordInput).should('have.attr', 'type', 'password');
    });

    it('should display postal code field in red with error when not filled correctly', () => {
        const postalCodeInput = 'input[formControlName="postalCode"]';
        cy.get(postalCodeInput).type('123');
        cy.get(postalCodeInput).blur();
        cy.contains('.mat-error', 'Le code postal n\'est pas valide.').should('be.visible');
        cy.get(postalCodeInput).type('00');
        cy.contains('.mat-error', 'Le code postal n\'est pas valide.').should('not.exist');
    });

    it('should redirect to home page after form submission', () => {
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password123!');
        cy.get('input[formControlName="confirmPassword"]').type('Password123!');
        cy.get('input[formControlName="postalCode"]').type('12345');
        cy.contains('button', 'Valider').click();
        cy.url().should('include', '/home');
    });
});
