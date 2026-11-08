describe('compra completa', ()=> {
    beforeEach(()=> {
        cy.visit('https://with-bugs.practicesoftwaretesting.com/')
        })

    it('compra exitosa', ()=> {
        cy.addToCart(1)
        cy.home()
        cy.addToCart(5)
        cy.accessToCart()
        cy.accessToCheckout()
        /*cy.fixture('users').then((data)=> {
            const usuario = data.user_customer_1
            const contrasenia = data.user_password
            cy.ingreso(usuario, contrasenia)
            })*/
        cy.fixture('datos_de_compra').then((data)=> {
            const address = data.address
            const city = data.city
            const state = data.state
            const country = data.country
            const postcode = data.postcode
            const name = data.name
            const accountNumber = data.accountNumber 
            cy.datosDeEnvio(address, city, state, country, postcode)
            cy.datosDePago(2, name, accountNumber)
        })
        cy.get('.help-block').should('be.visible')
        .and('contain', 'invoice number')
        .and((cy.get('[data-test="cart-quantity"]').should('not.be.visible')))
    })})