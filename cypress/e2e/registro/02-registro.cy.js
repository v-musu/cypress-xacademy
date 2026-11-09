describe('Formulario de registro', () => {

  it('FORM-REG-01 - Registro exitoso', () => {

    cy.fixture('register-user').then((user) => {
      const firstName = user.firstNames[
        Math.floor(Math.random() * user.firstNames.length)
      ];

        const lastName = user.lastNames[
        Math.floor(Math.random() * user.lastNames.length)
      ];

      const city = user.cities[
        Math.floor(Math.random() * user.cities.length)
      ];

      const email = `user${Date.now()}@test.com`;
      const newUser = {
        firstName,
        lastName,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        postcode: user.postcode,
        city,
        country: user.country,
        state: user.state,
        phone: user.phone,
        email,
        password: user.password
      };

      cy.openRegistrationForm();
      cy.fillRegistrationForm(newUser);
      cy.get('[data-test="register-submit"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.url().should('include', '/auth/login');

    });

  });

});