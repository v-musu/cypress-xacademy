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

  
it('FORM-REG-02 - No permite registrar un usuario con todos los campos vacíos', () => {

  cy.openRegistrationForm();
  cy.get('[data-test="register-submit"]')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.url().should('include', '/auth/register');
  
  const campos = [
        { selector: 'first-name-error', mensaje: 'First name is required.' },
        { selector: 'last-name-error', mensaje: 'Last name is required.' },
        { selector: 'dob-error',
          mensaje: [
            'Please enter a valid date in YYYY-MM-DD format.',
            'Date of Birth is required.'
          ] },
        { selector: 'address-error', mensaje: 'Address is required.' },
        { selector: 'postcode-error', mensaje: 'Postcode is required.' },
        { selector: 'city-error', mensaje: 'City is required.' },
        { selector: 'state-error', mensaje: 'State is required.' },
        { selector: 'country-error', mensaje: 'Country is required.' },
        { selector: 'phone-error', mensaje: 'Phone is required.' },
        { selector: 'email-error', mensaje: 'E-mail is required.' },
        { selector: 'password-error', mensaje: 'Password is required.' }
    ];

    
    campos.forEach((campo) => {

      cy.get(`[data-test="${campo.selector}"]`)
      .should('be.visible')
      .then(($error) => {

        const mensajes = Array.isArray(campo.mensaje)
          ? campo.mensaje
          : [campo.mensaje];

          mensajes.forEach((mensaje) => {
            expect($error.text()).to.contain(mensaje);
          });

      });
    });

  });


it('FORM-REG-03 - No permite registrar un usuario con correo electrónico inválido', () => {
  cy.openRegistrationForm();
  
  cy.createTestUser({
      email: 'correo_invalido.com'
    }).then((newUser) => {

        cy.fillRegistrationForm(newUser);

        cy.get('[data-test="register-submit"]')
          .scrollIntoView()
          .should('be.visible')
          .click();
    });
  
  cy.url().should('include', '/auth/register');
  cy.get('[data-test="email-error"]')
  .should('be.visible')
  .and('contain', 'E-mail format is invalid.');
});


it('FORM-REG-04 - No permite registrar un usuario con fecha de nacimiento futura', () => {

    cy.openRegistrationForm();

    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 1);

    const fechaFormateada = [
        fechaFutura.getFullYear(),
        String(fechaFutura.getMonth() + 1).padStart(2, '0'),
        String(fechaFutura.getDate()).padStart(2, '0')
    ].join('-');
    
    const email = `user${Date.now()}@test.com`;

    cy.createTestUser({
        dateOfBirth: fechaFormateada,
        email: email
    }).then((newUser) => {

        cy.fillRegistrationForm(newUser);

        cy.get('[data-test="register-submit"]')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/auth/register');

        cy.get('[data-test="register-error"]')
        .should('be.visible')
        .and('contain', 'Customer must be 18 years old.');

    });

});
    
it('FORM-REG-05 - Permite un carácter en nombre y apellido, pero rechaza un teléfono de 25 dígitos', () => {

    cy.openRegistrationForm();
    const email = `user${Date.now()}@test.com`;

    cy.createTestUser({
        firstName: 'A',
        lastName: 'B',
        phone: '1234567890123456789012345',
        email: email
    }).then((newUser) => {

        cy.fillRegistrationForm(newUser);

        cy.get('[data-test="register-submit"]')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/auth/register');

        cy.get('[data-test="register-error"]')
        .should('be.visible')
        .and('contain', 'The phone field must not be greater than 24 characters.');

    
    });

});
   
it.only('FORM-REG-06 - Permite registrar un usuario con exactamente 18 años cumplidos', () => {

    cy.openRegistrationForm();
    const email = `user${Date.now()}@test.com`;

    const fechaNacimiento = new Date();
    fechaNacimiento.setFullYear(fechaNacimiento.getFullYear() - 18);

    const fechaFormateada = [
        fechaNacimiento.getFullYear(),
        String(fechaNacimiento.getMonth() + 1).padStart(2, '0'),
        String(fechaNacimiento.getDate()).padStart(2, '0')
    ].join('-');

    cy.createTestUser({
        dateOfBirth: fechaFormateada,
        email:email
    }).then((newUser) => {

        cy.fillRegistrationForm(newUser);

        cy.get('[data-test="register-submit"]')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/auth/login');    


    });

});

});