import { selectores, textoANumero } from '../support/selectores'

describe('Carrito - eliminar productos', () => {
  context('Carrito con 2 o más productos', () => {
    beforeEach(() => {
      cy.visit('https://with-bugs.practicesoftwaretesting.com/')
      cy.addToCart(1)
      cy.home()
      cy.addToCart(3)
      cy.accessToCart()
    })

    it('el precio de línea coincide con precio unitario x cantidad', () => {
      cy.obtenerDatosPrimerProducto().then((datos) => {
        cy.verificarCoherenciaPrecioLinea(datos)
      })
    })

    it('el producto eliminado ya no existe en el carrito', () => {
      cy.obtenerDatosPrimerProducto().then((datos) => {
        cy.get(selectores.botonEliminar).click()

        cy.verificarProductoEliminado(datos.titulo)
      })
    })

    it('el total del carrito se recalcula restando el precio de línea eliminado', () => {
        cy.get(selectores.titulo).its('length').then((cantidadInicial) => {
            cy.obtenerDatosPrimerProducto().then((datos) => {
                cy.get(selectores.botonEliminar).click()

      // Precondición: el ítem realmente se eliminó (si no, el test falla acá)
                cy.get(selectores.titulo).should('have.length', cantidadInicial - 1)
                cy.verificarProductoEliminado(datos.titulo)

      // Recién entonces se valida el total recalculado
                const totalEsperado = datos.totalCarrito - datos.precioLinea
                cy.get(selectores.totalCarrito).should(($total) => {
                expect(textoANumero($total.text())).to.be.closeTo(totalEsperado, 0.01)
                })
            })
        })
    })
  })

  context('Carrito con un único producto', () => {
    beforeEach(() => {
      cy.visit('https://with-bugs.practicesoftwaretesting.com/')
      cy.addToCart(1)
      cy.accessToCart()
    })

    it('muestra el mensaje de carrito vacío al eliminar el único producto', () => {
      cy.get(selectores.botonEliminar).click()

      cy.contains(selectores.mensajeCarritoVacio, 'The cart is empty. Nothing to display.').should('be.visible')
    })
  })
})