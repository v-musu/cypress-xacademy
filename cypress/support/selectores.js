export const selectores = {
  titulo: '[data-test="product-title"]',
  precioUnitario: ':nth-child(1) > [data-test="product-price"]',
  cantidad: '[data-test="product-quantity"]',
  precioLinea: ':nth-child(1) > [data-test="line-price"]',
  totalCarrito: '[data-test="cart-total"]',
  botonEliminar: ':nth-child(1) > .col-md-1 > .btn',
  mensajeCarritoVacio: '.ng-star-inserted',
  contadorResultados: '[data-test="search-result-count"]'
}

export const textoANumero = (texto) => parseFloat(texto.replace(/[^0-9.]/g, ''))