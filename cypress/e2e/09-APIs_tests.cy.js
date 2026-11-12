describe('API', () => {
    it('Consultar el listado de productos', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.expose('urlApi')}/products`
        }).then((respuesta) => {
            expect(respuesta.status).to.eq(200)
            expect(respuesta.body.data).to.be.an('array').and.not.be.empty
        })
    })

    it('Ingresar vía API y generar un token', () => {
        cy.fixture('users').then((usuarios) => {
            cy.request({
                method: 'POST',
                url: `${Cypress.expose('urlApi')}/users/login`,
                body: {
                    email: usuarios.user_customer_1,
                    password: usuarios.user_password
                }
            }).then((respuesta) => {
                expect(respuesta.status).to.eq(200)
                expect(respuesta.body).to.have.property('access_token')
                expect(respuesta.body.access_token).to.be.a('string').and.not.be.empty
            })
        })
    })
})