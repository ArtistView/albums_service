describe('My App Tests', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3273');
  });
  it('contains at least one album', () => {
    cy.contains(/Albums|Singles and EPs|Collaborations|Appears On/g);
    // check if the app contains any of those texts
  });
  it('album cover gets darker on hover', () => {
    cy.get('.album').first().trigger('mouseover'); // hovering over the first album
    cy.get('#album-cover').first().should('have.css', 'opacity', '.5');
  });
});
