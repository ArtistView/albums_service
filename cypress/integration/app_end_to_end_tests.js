import React from 'react';
import { mount } from 'cypress-react-unit-test';
import $ from 'jquery';
import Album from '../../client/components/Album/Album.jsx';
import AlbumList from '../../client/components/AlbumList/AlbumList.jsx';

const playPauseList = ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'];

let numToShow = 12;
const width = Cypress.config().viewportWidth;
if (width > 1040 && width < 1200) {
  numToShow = 8;
} else if (width < 1040 && width > 850) {
  numToShow = 3;
} else if (width < 850) {
  numToShow = 2;
} else {
  numToShow = 12;
}

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
    // this will fail in the case of there only being one album on the entire page
    // add in a check for that and make the test pass if there is only 1 album (or i guess no albums but that case is not realistic)
    cy.get('.album').eq(0).find('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
    cy.get('.album').eq(0).find('#play-button').first().click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
    cy.get('.album').eq(0).find('#play-button').first().should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
    cy.get('.album').eq(1).find('#play-button').click({ force: true }); // click on play on another album
    cy.get('.album').eq(0).find('#play-button').first().should('have.attr', 'src').should('include', playPauseList[0]); // checks if the first album shows play
    cy.get('.album').eq(1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if the second album shows pause now
    cy.get('.album').eq(1).find('#play-button').click({ force: true }); // click on pause on second album
    cy.get('.album').eq(1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if the second album shows play again
  });
  // TODO: test if the audio is being played (and if it's the right audio) upon the click of the play/pause button
  // it('play/pause toggles turns on and off audio', () => { // instead of checking the images check the audio here
  //   // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play at first
  //   cy.get('#play-button').click({ force: true }); // clicks the button (force must be true bc it only turns visible on hover and this doesn't mess with css)
  //   // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if it shows pause
  //   cy.get('#play-button').click({ force: true }); // changes it back
  //   // cy.get('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if it shows play again
  // });
  it('Album keeps playing when collapsed and reopened with show more/less button', () => {
    let index = 0;
    cy.get('.album-list').each(() => { // for each album list
      // cy.get('.album-list').eq(index).its('state.numToShow').then((numToShow) => console.log(numToShow));
      // cy.getReact('AlbumList').getCurrentState();
      cy.get('.album-list').eq(index).within(() => { // searches within that particular album list
        // cy.mount(<AlbumList />);
        cy.get('.album-list-show-more-less')
          .then((data) => {
            if (data.is(':visible')) { // if the component is visible
              cy.contains('SHOW MORE'); // checks if show more is visible
              cy.get('.album-list-show-more-less').click(); // clicks to show more
              cy.get('.album').eq(numToShow + 1).find('#play-button').click({ force: true }); // clicks on the first newly visible album to play it
              cy.contains('SHOW LESS'); // checks if show less is visible
              cy.get('.album-list-show-more-less').click(); // click to make it show less
              cy.contains('SHOW MORE'); // checks if show more is visible
              cy.get('.album-list-show-more-less').click(); // clicks to show more
              cy.get('.album').eq(numToShow + 1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[1]); // checks if the album shows pause button
              cy.get('.album').eq(numToShow + 1).find('#play-button').click({ force: true }); // clicks on the first newly visible album to pause it
              cy.get('.album').eq(numToShow + 1).find('#play-button').should('have.attr', 'src').should('include', playPauseList[0]); // checks if the album shows play button
              cy.get('.album-list-show-more-less').click(); // clicks to show less at the end of the test
            } else {
              cy.contains('SHOW MORE').should('not.exist'); // check to make sure the button isn't showing
            }
          });
      });
      index++;
    });
  });
  it('Show more/less button toggles the text', () => {
    let index = 0;
    cy.get('.album-list').each(() => { // for each album list
      cy.get('.album-list').eq(index).within(() => { // searches within that particular album list
        cy.get('.album-list-show-more-less')
          .then((data) => {
            if (data.is(':visible')) { // if the component is visible
              cy.contains('SHOW MORE'); // checks if show more is visible
              cy.get('#album-down-arrow').should('exist'); // checks if the down arrow is present
              cy.get('.album-list-show-more-less').click(); // clicks all the visible buttons
              cy.contains('SHOW LESS'); // checks if show less is visible
              cy.get('#album-up-arrow').should('exist'); // checks if the up arrow is present
              cy.get('.album-list-show-more-less').click(); // clicks all the visible buttons
              cy.contains('SHOW MORE'); // checks if show more is visible
              cy.get('#album-down-arrow').should('exist'); // checks if the down arrow is present
            } else {
              cy.contains('SHOW MORE').should('not.exist'); // check to make sure the button isn't showing
            }
          });
      });
      index++;
    });
  });
  it('Shows more/less albums upon click of the button and has fewer than 12 albums always if no button is visible', () => {
    let index = 0;
    cy.get('.album-list').each(() => { // for each album list
      cy.get('.album-list').eq(index).within(() => { // searches within that particular album list
        cy.get('.album-list-show-more-less')
          .then((data) => {
            if (data.is(':visible')) { // if the component is visible
              cy.get('.album:visible').its('length').should('eq', numToShow); // 12 albums should show at the start
              cy.get('.album-list-show-more-less:visible').click(); // clicks to show more
              cy.get('.album:visible').its('length').should('be.gte', numToShow + 1); // more than 12 albums should be visible
              cy.get('.album-list-show-more-less:visible').click(); // clicks to show less
              cy.get('.album:visible').its('length').should('eq', numToShow); // only 12 albums should show again
            } else {
              cy.get('.album:visible').its('length').should('be.lte', numToShow); // make sure there are 12 or fewer if the button doesn't show
            }
          });
      });
      index++;
    });
  });
});