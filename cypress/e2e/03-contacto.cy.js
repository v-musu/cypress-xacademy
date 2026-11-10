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

});