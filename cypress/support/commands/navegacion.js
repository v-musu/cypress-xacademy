Cypress.Commands.add('home', ()=>{
    cy.get('[class="navbar-brand"]').click()
})

Cypress.Commands.add('navegacionSignIn', ()=>{
    cy.get('[data-test="nav-sign-in"]').click()
})

Cypress.Commands.add('navegacionForgotPassword', ()=>{
    cy.get('[data-test="nav-sign-in"]').click()
    cy.get('[data-test="forgot-password-link"]').click()
})