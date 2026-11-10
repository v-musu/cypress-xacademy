Cypress.Commands.add('addToCart', (numeroProducto)=> {
    cy.get(`[data-test="product-${numeroProducto}"]`).click()
    cy.get('[data-test="add-to-cart"]').click()
})

Cypress.Commands.add('accessToCart', ()=> {
    cy.get('[data-test="nav-cart"]').click()
})

Cypress.Commands.add('accessToCheckout', ()=> {
    cy.get('[data-test="proceed-1"]').click()
    cy.fixture('users').then((data)=> {
        const usuario = data.user_customer_1
        const contrasenia = data.user_password
        cy.ingreso(usuario, contrasenia)
    })
    cy.get('[data-test="proceed-2"]').click()
})

Cypress.Commands.add('datosDeEnvio', (address, city, state, country, postcode)=> {
    cy.get('[data-test="address"]').clear().type(address)
    cy.get('[data-test="city"]').clear().type(city)
    cy.get('[data-test="country"]').clear().type(country)
    cy.get('[data-test="postcode"]').clear().type(postcode)
    cy.get('[data-test="state"]').type(state)
    cy.get('[data-test="proceed-3"]').click()
})

Cypress.Commands.add('datosDePago', (metodo, name, accountNumber)=> {
    cy.get('[data-test="payment-method"]').select(metodo)
    cy.get('[data-test="account-name"]').type(name)
    cy.get('[data-test="account-number"]').type(accountNumber)
    cy.get('[data-test="finish"]').should('be.enabled').click()
})
