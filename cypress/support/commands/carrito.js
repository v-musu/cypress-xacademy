import { selectores, textoANumero } from '../selectores'

// Lee los datos del primer producto del carrito y el total actual
Cypress.Commands.add('obtenerDatosPrimerProducto', () => {
  const datos = {}

  return cy.get(selectores.titulo).first().invoke('text')
    .then((titulo) => {
      datos.titulo = titulo.trim()
      return cy.get(selectores.precioUnitario).invoke('text')
    })
    .then((precioUnitario) => {
      datos.precioUnitario = textoANumero(precioUnitario)
      return cy.get(selectores.cantidad).first().invoke('val')
    })
    .then((cantidad) => {
      datos.cantidad = parseInt(cantidad, 10)
      return cy.get(selectores.precioLinea).invoke('text')
    })
    .then((precioLinea) => {
      datos.precioLinea = textoANumero(precioLinea)
      return cy.get(selectores.totalCarrito).invoke('text')
    })
    .then((totalCarrito) => {
      datos.totalCarrito = textoANumero(totalCarrito)
      return datos
    })
})

// Verifica que precio unitario x cantidad = precio total de la línea
Cypress.Commands.add('verificarCoherenciaPrecioLinea', (datos) => {
  expect(datos.precioUnitario * datos.cantidad).to.be.closeTo(datos.precioLinea, 0.01)
})

// Verifica que el título ya no aparezca en ningún ítem del carrito
Cypress.Commands.add('verificarProductoEliminado', (titulo) => {
  cy.get(selectores.titulo).should(($titulos) => {
    const textos = Array.from($titulos).map((el) => el.innerText.trim())
    expect(textos).to.not.include(titulo)
  })
})