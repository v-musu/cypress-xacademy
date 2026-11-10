describe('Formulario de contacto', () => {

  it('FORM-CON-01 - Registro exitoso', () => {
    cy.openContactForm();
    cy.fixture('contact-data').then((contact) => {

        cy.fillContactForm(contact);
        cy.submitContactForm();    

    });

    cy.url().should('include', '/contact');
    cy.contains('[role="alert"]', 'Thanks for your message! We will contact you shortly.')
    .should('be.visible');

  });

  it('FORM-CON-02 - Registro exitoso con documento adjunto', () => {
    cy.openContactForm();
    cy.fixture('contact-data').then((contact) => {

        cy.fillContactForm(contact);
        cy.get('[data-test="attachment"]')
        .selectFile('cypress/fixtures/files/documento-prueba.pdf');
        cy.submitContactForm();
        

    });

    cy.url().should('include', '/contact');
    cy.contains('[role="alert"]', 'Thanks for your message! We will contact you shortly.')
    .should('be.visible');

  });

  it('FORM-CON-03 - Enviar formulario con campos vacios', () => {
    cy.openContactForm();
    cy.submitContactForm();
        
    cy.url().should('include', '/contact');
    
    const validations = [
        { selector: '[data-test="first-name-error"]', message: 'First name is required' },
        { selector: '[data-test="last-name-error"]', message: 'Last name is required' },
        { selector: '[data-test="email-error"]', message: 'Email is required' },
        { selector: '[data-test="subject-error"]', message: 'Subject is required' },
        { selector: '[data-test="message-error"]', message: 'Message is required' }
    ];

    validations.forEach((validation) => {
        cy.get(validation.selector)
        .should('be.visible')
        .should('contain.text', validation.message)    
    });

  });

  it.only('FORM-CON-04 - No permite enviar un correo inválido', () => {
    cy.openContactForm();
        
    cy.url().should('include', '/contact');

    cy.fixture('contact-data').then((contact) => {
     contact.email = 'correo_invalido.com';
     cy.fillContactForm(contact);
     cy.submitContactForm();

    });
    cy.get('[data-test="email-error"]')
    .should('be.visible')
    .and('contain', 'E-mail format is invalid.');

  });
    

});