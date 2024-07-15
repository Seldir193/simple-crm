




it('Visits the initial project page', () => {
  cy.visit('/dialog-edit-user')
  cy.get('body').should('be.visible');  // Sicherstellen, dass die Seite geladen ist
  cy.contains('First Name', { timeout: 10000 })  // Nach dem Element suchen
    .should('be.visible');  // Sicherstellen, dass das Element sichtbar ist
})
