describe('login', ()=> {
    beforeEach(()=> {
        cy.visit('https://with-bugs.practicesoftwaretesting.com/')
    })

    it('ingreso válido', ()=> {
        cy.fixture('users').then((data)=> {
            const usuario = data.user_customer_1
            const contrasenia = data.user_password
            cy.ingreso(usuario, contrasenia)
            cy.get('[data-test="page-title"]').should('be.visible')
            .and('have.text', 'My account')
        })
    })

    it('ingreso con contraseña incorrecta', ()=> {
        cy.fixture('users').then((data)=>{
            const usuario = data.user_customer_1
            const contrasenia = data.incorrect_password
            cy.ingreso(usuario, contrasenia)
            cy.get('[data-test="login-error"]').should('be.visible')
            .and('have.text', 'Invalid email or password')
        })
    })

    it('ingreso sin credenciales', ()=> {
        cy.navegacionSignIn()
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="login-error"]').should('be.visible')
        .and('have.text', 'Invalid email or password')
    })
})

