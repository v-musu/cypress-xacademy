describe('carrito de compras', ()=>{
    beforeEach(()=> {
        cy.visit('https://with-bugs.practicesoftwaretesting.com/')
    })

    it('agregar una unidad de producto al carrito', ()=>{
        cy.addToCart(1)
        cy.get('[data-test="nav-cart"]').should('be.visible')
        cy.get('[data-test="cart-quantity"]').should('have.text', 1)
        cy.get('.toast-body').should('have.text', 'Product added to shopping cart.')
    })

    it('agregar más de una unidad de producto al carrito', ()=>{
        const numeroProducto = 3
        cy.get(`[data-test="product-${numeroProducto}"]`).click()
        cy.get('[data-test="increase-quantity"]').click()
        cy.get('[data-test="quantity"]').should('have.value', 2)
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="nav-cart"]').should('be.visible')
        cy.get('[data-test="cart-quantity"]').should('have.text', 2)
    })
})