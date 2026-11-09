
Cypress.Commands.add('openRegistrationForm', () => {
  cy.visit('/');
  cy.contains('Sign in').click();
  cy.url().should('include', '/auth/login');
  cy.get('[data-test="register-link"]').click();
  cy.url().should('include', '/auth/register');
});


Cypress.Commands.add('fillRegistrationForm', (user) => {

  // First name
  cy.get('[data-test="first-name"]')
    .should('be.visible')
    .type(user.firstName);

  // Last name
  cy.get('[data-test="last-name"]')
    .should('be.visible')
    .type(user.lastName);

  // Date of birth
  cy.get('[data-test="dob"]')
    .should('be.visible')
    .type(user.dateOfBirth);

  // Address
  cy.get('[data-test="address"]')
    .should('be.visible')
    .type(user.address);

  // Postcode
  cy.get('[data-test="postcode"]')
    .should('be.visible')
    .type(user.postcode);

  // City
  cy.get('[data-test="city"]')
    .should('be.visible')
    .type(user.city);

  cy.get('[data-test="state"]')
  .should('be.visible')
  .type(user.state);

  cy.get('[data-test="country"]')
  .should('be.visible')
  .select('CO');

  // Phone
  cy.get('[data-test="phone"]')
    .should('be.visible')
    .type(user.phone);

  // Email
  cy.get('[data-test="email"]')
    .should('be.visible')
    .type(user.email);

  // Password
  cy.get('[data-test="password"]')
    .should('be.visible')
    .type(user.password);

});

