// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to submit a natural language query and wait for response
Cypress.Commands.add('submitQuery', (query) => {
  cy.get('input[placeholder="Ask Cricket..."]').clear().type(query);
  cy.get('button').contains('Send').click();
  // Wait for response to load - using the bubble class in the bot message
  cy.get('.message.bot .bubble', { timeout: 10000 }).should('exist');
});

// Custom command to check if SQL query is displayed correctly
Cypress.Commands.add('checkSqlQuery', (sqlQueryPartial) => {
  // The SQL might be in a modal or bubble element
  cy.get('.bubble, .modal-sql').should('contain', sqlQueryPartial);
});

// Custom command to verify results table exists and has data
Cypress.Commands.add('checkResultsTable', () => {
  cy.get('table').should('exist');
  cy.get('table tbody tr').should('have.length.at.least', 1);
});

// Custom command to intercept API requests to the backend
Cypress.Commands.add('interceptApiCall', () => {
  // Use process_query path without the wildcard
  cy.intercept('POST', 'http://localhost:8000/process_query/').as('queryRequest');
});

// Custom command to check if specific error message is displayed (based on error categories from system_prompt.txt)
Cypress.Commands.add('checkErrorMessage', (errorType) => {
  switch(errorType) {
    case 'time-of-day':
      cy.get('.message.bot .bubble').should('contain', 'The database does not contain time-of-day information, only match dates are available');
      break;
    case 'non-ipl':
      cy.get('.message.bot .bubble').should('contain', 'Please ask a question related to IPL cricket data');
      break;
    case 'ambiguous':
      cy.get('.message.bot .bubble').should('contain', 'I\'m sorry, I can\'t generate an answer for that query based on the current database');
      break;
    case 'db-change':
      cy.get('.message.bot .bubble').should('contain', 'I\'m sorry, i can\'t generate answer for that query');
      break;
    case 'sql-validation':
      cy.get('.message.bot .bubble').should('contain', 'Generated SQL query appears unsafe');
      break;
    case 'catches':
      cy.get('.message.bot .bubble').should('contain', 'Sorry, I Don\'t Know');
      break;
    default:
      cy.get('.message.bot .bubble').should('contain', errorType);
  }
});

// Custom command to mock standard API response with results
Cypress.Commands.add('mockSuccessfulResponse', (alias, sqlQuery, results) => {
  cy.intercept('POST', 'http://localhost:8000/process_query/', {
    statusCode: 200,
    body: {
      sql_query: sqlQuery,
      result: results,
      remaining_requests: {
        user_remaining: 95,
        global_remaining: 9800
      }
    }
  }).as(alias);
});

// Custom command to mock error API response based on error types from system_prompt.txt
Cypress.Commands.add('mockErrorResponse', (alias, errorType) => {
  let errorBody = {};
  
  switch(errorType) {
    case 'time-of-day':
      errorBody = {
        sql_query: "ERROR: The database does not contain time-of-day information, only match dates are available.",
        error: "The database does not contain time-of-day information, only match dates are available.",
      };
      break;
    case 'non-ipl':
      errorBody = {
        sql_query: "ERROR: Please ask a question related to IPL cricket data.",
        error: "Please ask a question related to IPL cricket data.",
      };
      break;
    case 'ambiguous':
      errorBody = {
        sql_query: "ERROR: I'm sorry, I can't generate an answer for that query based on the current database.",
        error: "I'm sorry, I can't generate an answer for that query based on the current database.",
      };
      break;
    case 'db-change':
      errorBody = {
        sql_query: "ERROR: I'm sorry, i can't generate answer for that query.",
        error: "I'm sorry, i can't generate answer for that query.",
      };
      break;
    case 'sql-validation':
      errorBody = {
        sql_query: "SELECT * FROM players; DROP TABLE players;",
        error: "Generated SQL query appears unsafe: Potentially unsafe SQL pattern detected",
      };
      break;
    case 'catches':
      errorBody = {
        sql_query: "ERROR: Sorry, I Don't Know",
        error: "Sorry, I Don't Know",
      };
      break;
    default:
      errorBody = {
        sql_query: `ERROR: ${errorType}`,
        error: errorType,
      };
  }
    // Add remaining requests to all error responses
  errorBody.remaining_requests = {
    user_remaining: 93,
    global_remaining: 9798
  };
    cy.intercept('POST', 'http://localhost:8000/process_query/', {
    statusCode: 200,
    body: errorBody
  }).as(alias);
});