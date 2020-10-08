
describe("editor", function() {
    it("splitting a node and changing numbers", function() {
        cy.visit('http://localhost:3000')
        cy.get('button').click()
        cy.get('input').eq(0).type('10')
        cy.get('input').eq(1).type('5')
        cy.get('.total').contains('15')
    })
  })