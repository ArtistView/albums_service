describe('My App Tests', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3273');
  });
  it('contains at least one album', () => {
    cy.contains(/Albums|Singles and EPs|Collaborations|Appears On/g);
    // check if the app contains any of those texts
  });
  it('album cover gets darker on hover', () => {
    cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // the album cover should start with an opacity of one when it's not hovered over
    cy.get('.album').first().invoke('mouseover') // hovering over the first album
      .then(cy.get('#album-cover').should('have.css', 'opacity', '.5')); // check if the opacity changed
    // cy.get('.album').first().trigger('mouseleave'); // stop hovering over the first album
    cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // check if the opacity changed back
  });
});
