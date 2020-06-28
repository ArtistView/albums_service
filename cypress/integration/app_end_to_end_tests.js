const playPauseList = ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'];

describe('My App Tests', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3273');
  });
  it('contains at least one album', () => {
    cy.contains(/Albums|Singles and EPs|Collaborations|Appears On/g);
    // check if the app contains any of those texts
  });
  // TODO: figure out how to change css on hover and test it
  // it('album cover gets darker on hover', () => {
  //   cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // the album cover should start with an opacity of one when it's not hovered over
  //   cy.get('.album').first().invoke('mouseover') // hovering over the first album
  //     .then(cy.get('#album-cover').should('have.css', 'opacity', '.5')); // check if the opacity changed
  //   // dont think i can even test this because hover using trigger doesn't change the css
  //   // cy.get('.album').first().trigger('mouseleave'); // stop hovering over the first album
  //   cy.get('#album-cover').first().should('have.css', 'opacity', '1'); // check if the opacity changed back
  // });
  // TODO: check other hovers, like the play and the title underline once I figure out the hover stuff
  it('play/pause toggles on click of the button', () => { // check if the play button switches to pause on click
    cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
    cy.get('#play-button').click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
    cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
    cy.get('#play-button').click({ force: true }); // changes it back
    cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play again
  });
  it('play/pause toggles on click of another album', () => { // check if the play button switches to pause on click
    cy.get('.album').eq(0).find('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
    cy.get('.album').eq(0).find('#play-button').first().click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
    cy.get('.album').eq(0).find('#play-button').first().should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
    cy.get('.album').eq(1).find('#play-button').click({ force: true }); // click on play on another album
    cy.get('.album').eq(0).find('#play-button').first().should('have.attr', 'src').should('include', playPauseList[0]); // checks if the first album shows play
    cy.get('.album').eq(1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if the second album shows pause now
    cy.get('.album').eq(1).find('#play-button').click({ force: true }); // click on pause on second album
    cy.get('.album').eq(1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if the second album shows play again
  });
  it('play/pause toggles turns on and off audio', () => { // instead of checking the images check the audio here
    // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
    cy.get('#play-button').click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
    // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
    cy.get('#play-button').click({ force: true }); // changes it back
    // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play again
  });
  it('Show more/less button toggles the text', () => {
    // maybe also check that the icons switched
    // TODO: only run this test when there are more then 12 albums of a particular type and test that it doesn't show if this condition isn't met
    if (cy.get('.album-list-show-more-less:visible').length > 0) {
      cy.contains('SHOW MORE'); // checks if show more is visible
      cy.get('.album-list-show-more-less:visible').click({multiple: true}); // clicks all the visible buttons
      cy.contains('SHOW LESS'); // checks if show less is visible
      cy.get('.album-list-show-more-less:visible').click({multiple: true}); // clicks all the visible buttons
      cy.contains('SHOW MORE'); // checks if show more is visible
    } else {
      cy.contains('SHOW MORE').should('not.exist'); // check to make sure the button isn't showing
    }
  });
  // TODO: test the show more and show less functions
});
