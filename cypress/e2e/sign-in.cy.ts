describe('Sign In Form', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should enable the submit button when the form is valid', () => {
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password1!');
        cy.get('input[formControlName="confirmPassword"]').type('Password1!');
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="postalCode"]').type('75000');
        cy.contains('button', 'Valider').should('not.be.disabled');
    });

    it('should disable the submit button when the form is invalid', () => {
        cy.contains('button', 'Valider').should('be.disabled');
        cy.get('input[formControlName="lastname"]').type('Doe');
        cy.get('input[formControlName="firstname"]').type('John');
        cy.get('input[formControlName="password"]').type('Password1!');
        cy.get('input[formControlName="confirmPassword"]').type('Password1!');
        cy.contains('button', 'Valider').should('be.disabled');
    });

    it('should display or hide password when click on the visibility button of password field', () => {
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

    it('should show and hide the reset button based on input value', () => {
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

    it('should show and hide the reset button based on input value and clear the input on click', () => {
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
