// cypress/e2e/fixture-based-tests.spec.js
describe('Fixture-based Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle successful query response from fixture', () => {
    // Load the fixture
    cy.fixture('successful-query.json').then((queryData) => {
      // Use the fixture to mock the API response with the exact URL from the app
      cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
        statusCode: 200,
        body: queryData.successfulQueryResponse
      }).as('successQuery');

      // Submit a query using the correct selector
      cy.get('input[placeholder="Ask Cricket..."]').clear().type('Who scored the most runs in IPL 2023?');
      cy.get('button').contains('Send').click();
      
      // Wait for the mocked response
      cy.wait('@successQuery');
      
      // Validate the UI elements using the app's actual structure
      cy.get('.bubble').should('exist');
      cy.get('table').should('exist');
      
      // Check for specific player names from the fixture
      cy.get('.bubble').should('contain', 'Virat Kohli');
      cy.get('table').should('contain', 'Virat Kohli');
      cy.get('table').should('contain', '825');
    });
  });

  it('should handle different error responses from fixtures', () => {
    // Load the fixture
    cy.fixture('error-responses.json').then((errorData) => {
      // First test: Non-IPL related query (main.py checks for IPL keywords)
      cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
        statusCode: 200,
        body: {
          "sql_query": "ERROR: Please ask a question related to IPL cricket data.",
          "error": "Please ask a question related to IPL cricket data.",
          "remaining_requests": errorData.errorResponse.remaining_requests
        }
      }).as('nonIplQuery');

      // Submit a query about weather (non-IPL related)
      cy.get('input[placeholder="Ask Cricket..."]').clear().type('What is the weather today?');
      cy.get('button').contains('Send').click();
      
      // Wait for the mocked response
      cy.wait('@nonIplQuery');
      
      // Validate the error message appears in a bubble
      cy.get('.bubble').should('contain', 'Please ask a question related to IPL cricket data.');

      // Second test: SQL validation error - based on SQLValidator class
      cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
        statusCode: 200,
        body: {
          "sql_query": "SELECT * FROM users; DROP TABLE users;",
          "error": "Generated SQL query appears unsafe: Query contains multiple statements",
          "remaining_requests": errorData.sqlValidationError.remaining_requests
        }
      }).as('sqlInjectionError');

      // Submit a query that would trigger SQL validation error
      cy.get('input[placeholder="Ask Cricket..."]').clear().type('Show all IPL data with complex subqueries');
      cy.get('button').contains('Send').click();
      
      // Wait for the mocked response
      cy.wait('@sqlInjectionError');
      
      // Validate the error message appears in a bubble
      cy.get('.bubble').should('contain', 'Generated SQL query appears unsafe');

      // Third test: Non-cricket query from system_prompt.txt
      cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
        statusCode: 200,
        body: {
          "sql_query": "ERROR: I'm sorry, I can't generate an answer for that query based on the current database.",
          "error": "I'm sorry, I can't generate an answer for that query based on the current database.",
          "remaining_requests": errorData.sqlValidationError.remaining_requests
        }
      }).as('nonCricketQuery');

      // Submit a query not related to cricket
      cy.get('input[placeholder="Ask Cricket..."]').clear().type('Tell me about quantum physics');
      cy.get('button').contains('Send').click();
      
      // Wait for the mocked response
      cy.wait('@nonCricketQuery');
      
      // Validate the error message appears in a bubble with the exact wording from system_prompt.txt
      cy.get('.bubble').should('contain', "I'm sorry, I can't generate an answer for that query based on the current database");
    });
  });
});