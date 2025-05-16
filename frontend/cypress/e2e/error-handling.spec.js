// cypress/e2e/error-handling.spec.js
describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/');
    // No need to call interceptApiCall here as we're setting up specific intercepts in each test
  });  it('should handle network errors gracefully', () => {
    // Force a network error by rejecting the request
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, { forceNetworkError: true }).as('networkError');
    
    const query = 'Show me top IPL batsmen';
    
    // Submit the query
    cy.submitQuery(query);
    
    // Check for the error message displayed to users
    cy.get('.message.bot .bubble').should('contain.text', 'Something went wrong');
  });  it('should handle short or ambiguous queries', () => {
    const shortQuery = 'IPL';
    
    // Mock an ambiguous error response with exact message that matches the frontend
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: I'm sorry, I can't generate an answer for that query based on the current database.",
        error: "I'm sorry, I can't generate an answer for that query based on the current database.",
        remaining_requests: {
          user_remaining: 95,
          global_remaining: 9800
        }
      }
    }).as('ambiguousQueryRequest');
    
    // Submit the query
    cy.submitQuery(shortQuery);
    
    // Wait for the response and verify the message text directly
    cy.get('.message.bot .bubble').contains("I'm sorry, I can't generate an answer");
  });  it('should handle time-of-day query errors', () => {
    const timeQuery = 'Which matches were played at night time?';
    
    // Use direct intercept for time-of-day error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: The database does not contain time-of-day information, only match dates are available.",
        error: "The database does not contain time-of-day information, only match dates are available.",
        remaining_requests: {
          user_remaining: 94,
          global_remaining: 9799
        }
      }
    }).as('timeQueryRequest');
    
    // Submit the query
    cy.submitQuery(timeQuery);
    
    // Verify the correct error message is displayed
    cy.get('.message.bot .bubble').contains("time-of-day information");
  });  it('should handle non-IPL query errors', () => {
    const nonIplQuery = 'Who won the FIFA World Cup in 2022?';
    
    // Use direct intercept for non-IPL error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: Please ask a question related to IPL cricket data.",
        error: "Please ask a question related to IPL cricket data.",
        remaining_requests: {
          user_remaining: 93,
          global_remaining: 9798
        }
      }
    }).as('nonIplQueryRequest');
    
    // Submit the query
    cy.submitQuery(nonIplQuery);
    
    // Verify the correct error message is displayed
    cy.get('.message.bot .bubble').contains("related to IPL cricket data");
  });  it('should handle database modification query errors', () => {
    const dbChangeQuery = 'Update player statistics for Virat Kohli';
      // Use direct intercept for database change error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: I'm sorry, i can't generate answer for that query.",
        error: "I'm sorry, i can't generate answer for that query.",
        remaining_requests: {
          user_remaining: 92,
          global_remaining: 9797
        }
      }
    }).as('dbChangeQueryRequest');
    
    // Submit the query
    cy.submitQuery(dbChangeQuery);
    
    // Verify the correct error message is displayed
    cy.get('.message.bot .bubble').contains("i can't generate answer for that query");
  });  it('should handle SQL validation errors for potentially harmful queries', () => {
    const maliciousQuery = 'Show all players; DROP TABLE players;';
      // Use direct intercept for SQL validation error
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "SELECT * FROM players; DROP TABLE players;",
        error: "Potentially unsafe SQL pattern detected",
        remaining_requests: {
          user_remaining: 91,
          global_remaining: 9796
        }
      }
    }).as('sqlValidationRequest');
    
    // Submit the query
    cy.submitQuery(maliciousQuery);
    
    // Verify error message matches the application's actual message
    cy.get('.message.bot .bubble').contains("unsafe SQL pattern");
  });  it('should handle catch query errors', () => {
    const catchesQuery = 'Who caught the most catches in IPL?';
      // Use direct intercept for catch error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200, 
      body: {
        sql_query: "ERROR: Sorry, I Don't Know",
        error: "Sorry, I Don't Know",
        remaining_requests: {
          user_remaining: 90,
          global_remaining: 9795
        }
      }
    }).as('catchesQueryRequest');
    
    // Submit the query
    cy.submitQuery(catchesQuery);
    
    // Verify the error message as displayed in the application
    cy.get('.message.bot .bubble').contains("Sorry, I Don't Know");
  });
  it('should handle hitting IP request limit', () => {
    const query = 'Who scored the most runs in IPL?';
      // Use direct intercept for request limit response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        error: 'You have exceeded your daily limit. You have 0 requests remaining for today.',
        remaining_requests: {
          user_remaining: 0,
          global_remaining: 9500
        }
      }
    }).as('limitExceededRequest');
    
    // Submit the query
    cy.submitQuery(query);
    
    // Verify limit exceeded message is displayed
    cy.get('.message.bot .bubble').should('contain.text', 'exceeded your daily limit');
  });
  it('should handle hitting global request limit', () => {
    const query = 'Who scored the most runs in IPL?';
      // Use direct intercept for global limit response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        error: 'The service has reached its daily request limit. Please try again tomorrow.',
        remaining_requests: {
          user_remaining: 10,
          global_remaining: 0
        }
      }
    }).as('globalLimitExceededRequest');
    
    // Submit the query
    cy.submitQuery(query);
    
    // Verify global limit exceeded message is displayed
    cy.get('.message.bot .bubble').should('contain.text', 'daily request limit');
  });  it('should handle backend server errors gracefully', () => {
    const query = 'List all IPL teams';
      // Use direct intercept for server error
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 500,
      body: {
        error: 'Internal server error'
      }
    }).as('serverErrorRequest');
    
    // Submit the query
    cy.submitQuery(query);
    
    // Verify server error message as displayed by the application
    cy.get('.message.bot .bubble').contains('Internal server error');
  });
});