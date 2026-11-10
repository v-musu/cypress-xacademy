describe('agregando productos al carrito', ()=>{
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
    }) })

    /* it('elimina un producto del carrito con 2 o más productos y recalcula el total', () => {
        cy.addToCart(1)
        cy.home()
        cy.addToCart(3)
        cy.accessToCart()
    
        cy.obtenerDatosPrimerProducto().then((datos) => {
            cy.verificarCoherenciaPrecioLinea(datos)

            cy.get(selectores.botonEliminar).click()

      // 1) El producto ya no existe en el carrito
            cy.verificarProductoEliminado(datos.titulo)

      // 2) El total se recalcula restando el precio total de la línea eliminada
            const totalEsperado = datos.totalCarrito - datos.precioLinea
            cy.get(selectores.totalCarrito).should(($total) => {
            expect(textoANumero($total.text())).to.be.closeTo(totalEsperado, 0.01)
      })
    })
  })

  it('elimina el único producto del carrito y muestra el mensaje de carrito vacío', () => {
    cy.addToCart(1)
    cy.accessToCart()

    cy.obtenerDatosPrimerProducto().then((datos) => {
      cy.verificarCoherenciaPrecioLinea(datos)

      cy.get(selectores.botonEliminar).click()

      // Se muestra el mensaje completo de carrito vacío
      cy.contains(selectores.mensajeCarritoVacio, 'The cart is empty. Nothing to display.').should('be.visible')
    })
  })
   
}) */