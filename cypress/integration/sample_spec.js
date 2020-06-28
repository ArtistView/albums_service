const playPauseList = ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'];

describe('My App Tests', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3273');
  });
  it('contains at least one album', () => {
    cy.contains(/Albums|Singles and EPs|Collaborations|Appears On/g);
    // check if the app contains any of those texts
  });
  // it('album cover gets darker on hover', () => {
  //   cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // the album cover should start with an opacity of one when it's not hovered over
  //   cy.get('.album').first().invoke('mouseover') // hovering over the first album
  //     .then(cy.get('#album-cover').should('have.css', 'opacity', '.5')); // check if the opacity changed
  //   // dont think i can even test this because hover using trigger doesn't change the css
  //   // cy.get('.album').first().trigger('mouseleave'); // stop hovering over the first album
  //   cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // check if the opacity changed back
  // });
  it('play/pause toggles on click', () => { // check if the play button switches to pause on click
    cy.get('#play-button').first().should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
    cy.get('#play-button').first().click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
    cy.get('#play-button').first().should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
    cy.get('#play-button').first().click({ force: true }); // changes it back
    cy.get('#play-button').first().should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play again
  });
});
