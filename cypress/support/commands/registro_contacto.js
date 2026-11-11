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


Cypress.Commands.add('createTestUser', (overrides = {}) => {

    return cy.fixture('register-user').then((user) => {

        const randomItem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };

        const newUser = {
            firstName: randomItem(user.firstNames),
            lastName: randomItem(user.lastNames),
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            postcode: user.postcode,
            city: randomItem(user.cities),
            country: user.country,
            state: user.state,
            phone: user.phone,
            email: user.email,
            password: user.password,
            ...overrides
        };

        return newUser;
    });

});

Cypress.Commands.add('openContactForm', () => {
  cy.visit('/');
  cy.get('[data-test="nav-contact"]').click();
  cy.url().should('include', '/contact');

});

Cypress.Commands.add('fillContactForm', (contact) => {
  cy.get('[data-test="first-name"]')
  .should('be.visible')
  .type(contact.firstName);

  cy.get('[data-test="last-name"]')
  .should('be.visible')
  .type(contact.lastName);

  cy.get('[data-test="email"]')
  .should('be.visible')
  .type(contact.email);

  cy.get('[data-test="subject"]')
  .should('be.visible')
  .select(contact.subject);

  cy.get('[data-test="message"]')
  .should('be.visible')
  .type(contact.message);


});

Cypress.Commands.add('submitContactForm', () => {
  cy.get('[data-test="contact-submit"]')
  .scrollIntoView()
  .should('be.visible')
  .should('be.enabled')
  .click()
  
});