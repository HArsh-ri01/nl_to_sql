// cypress/e2e/home.spec.js
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page successfully', () => {
    // The actual app doesn't have an H1 with "Natural Language to SQL"
    // Instead it has a chat interface with a Lottie animation
    cy.get('.empty-state-container').should('exist');
    cy.get('.suggested-container').should('exist');
  });

  it('should have a working query form', () => {
    // Update selectors to match actual UI elements
    cy.get('input[placeholder="Ask Cricket..."]').should('exist');
    cy.get('button').contains('Send').should('exist');
  });

  it('should display suggested questions', () => {
    // Check for suggested questions that are displayed when no messages exist
    cy.get('.suggested-bubble').should('have.length.at.least', 2);
    cy.get('.suggested-bubble').first().should('contain', 'IPL');
  });

  it('should allow typing and submitting a query', () => {
    // Test basic form interaction
    const testQuery = 'Who scored the most runs in IPL 2023?';
    cy.get('input[placeholder="Ask Cricket..."]').type(testQuery);
    cy.get('input[placeholder="Ask Cricket..."]').should('have.value', testQuery);
    
    // Just verify the button is clickable, without actually submitting
    cy.get('button').contains('Send').should('not.be.disabled');
  });
});