
Cypress.Commands.add('ingreso', (usuario, contrasenia)=> {
    cy.get('[data-test="email"]').type(usuario)
    cy.get('[data-test="password"]').type(contrasenia)
    cy.get('[data-test="login-submit"]').click()
})



Cypress.Commands.add('ingreso', (usuario, contrasenia)=> {
    cy.get('[data-test="email"]').type(usuario)
    cy.get('[data-test="password"]').type(contrasenia)
    cy.get('[data-test="login-submit"]').click()
})
