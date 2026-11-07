describe('recupero de contrasenia', ()=> {
    beforeEach(()=> {
        cy.visit('https://with-bugs.practicesoftwaretesting.com/')
    })

    it('recupero con email registrado', ()=> {
        cy.navegacionForgotPassword()
        cy.fixture('users').then((data)=> {
            const email = data.user_customer_2
            const expectedDuration = 3000
            cy.get('[data-test="email"]').type(email)
            cy.get('[data-test="forgot-password-submit"]').click()
            let appearedAt
            cy.get('[class="alert alert-success mt-3"]', {timeout: 5000}).should('be.visible')
            .and('contain', "Your password is successfully updated!")
            .then(()=> {
                appearedAt = Date.now()
            })
            cy.get('[class="alert alert-success mt-3"]', {timeout: expectedDuration + 2000}).should('not.exist')
            .then(()=> {
                const elapsed = Date.now() - appearedAt
                cy.log(`Duración medida: ${elapsed} ms`)
            })
        })
    })
})