import {selectores} from '../support/selectores'

describe('buscar un producto', ()=> {
    beforeEach(()=>{
        cy.visit('https://with-bugs.practicesoftwaretesting.com/')
    })

    it('SEARCH-01 - Realizar una búsqueda válida de producto', () => {
    let producto = "Pliers"

    cy.intercept('GET', '**/products/search*').as('busqueda')
    cy.buscarProducto(producto)
    cy.wait('@busqueda')

    cy.get(selectores.contadorResultados).should(($contador) => {
        expect(parseInt($contador.text())).to.be.greaterThan(0)
    })
    
    cy.get('[data-test="product-name"]').each(($nombre) => {
        expect($nombre.text().toLowerCase()).to.contain(producto.toLowerCase())
        })
    })

    it('SEARCH-02 - Realizar una búsqueda sin resultados', ()=> {
        let producto = "abc"

        cy.intercept('GET', '**/products/search*').as('busqueda')
        cy.buscarProducto(producto)
        cy.wait('@busqueda')

        cy.get(selectores.contadorResultados).should(($contador) => {
            expect(parseInt($contador.text())).to.be.equal(0)
        })
    })
})