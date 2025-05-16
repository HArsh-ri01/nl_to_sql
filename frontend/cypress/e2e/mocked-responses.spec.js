// cypress/e2e/mocked-responses.spec.js
describe('Mocked API Responses', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display successful query results from a mock response', () => {
    // Mock a successful API response matching the backend implementation
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'SELECT player_name, SUM(runs) as total_runs FROM matches JOIN players ON matches.player_id = players.id WHERE season = 2023 GROUP BY player_name ORDER BY total_runs DESC LIMIT 10',
        result: [
          { player_name: 'Virat Kohli', total_runs: 825 },
          { player_name: 'Shubman Gill', total_runs: 795 },
          { player_name: 'Faf du Plessis', total_runs: 720 }
        ],
        remaining_requests: {
          user_remaining: 95,
          global_remaining: 9800
        }
      }
    }).as('mockSuccess');

    // Type a query and submit the form with the correct selectors
    cy.get('input[placeholder="Ask Cricket..."]').clear().type('Who scored the most runs in IPL 2023?');
    cy.get('button').contains('Send').click();
    
    // Wait for the mocked response
    cy.wait('@mockSuccess');
    
    // Verify the UI displays the results correctly with actual selectors
    cy.get('.message.bot .bubble').should('exist');
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length', 3);
    cy.get('table').should('contain', 'Virat Kohli');
    cy.get('table').should('contain', '825');
  });

  it('should display error message from a mock error response', () => {
    // Mock an error response matching the backend SQL validator error format
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'ERROR: Generated SQL query appears unsafe',
        error: 'Generated SQL query appears unsafe: Query contains multiple statements',
        remaining_requests: {
          user_remaining: 94,
          global_remaining: 9799
        }
      }
    }).as('mockError');

    // Type a query and submit the form with the correct selectors
    cy.get('input[placeholder="Ask Cricket..."]').clear().type('Show all data with DROP TABLE command');
    cy.get('button').contains('Send').click();
    
    // Wait for the mocked response
    cy.wait('@mockError');
    
    // Verify the UI displays the error message correctly
    cy.get('.message.bot .bubble').should('contain', 'Generated SQL query appears unsafe');
  });

  it('should display non-IPL query error message', () => {
    // Mock the error response for non-IPL related queries from main.py
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'ERROR: Please ask a question related to IPL cricket data.',
        error: 'Please ask a question related to IPL cricket data.',
        remaining_requests: {
          user_remaining: 93,
          global_remaining: 9798
        }
      }
    }).as('nonIplError');

    // Type a non-IPL query
    cy.get('input[placeholder="Ask Cricket..."]').clear().type('What is the weather today?');
    cy.get('button').contains('Send').click();
    
    // Wait for the mocked response
    cy.wait('@nonIplError');
    
    // Verify the UI displays the specific error message from main.py
    cy.get('.message.bot .bubble').should('contain', 'Please ask a question related to IPL cricket data');
  });

  it('should display non-cricket database error message', () => {
    // Mock the error response for queries unrelated to cricket database
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: I'm sorry, I can't generate an answer for that query based on the current database.",
        error: "I'm sorry, I can't generate an answer for that query based on the current database.",
        remaining_requests: {
          user_remaining: 92,
          global_remaining: 9797
        }
      }
    }).as('nonCricketError');

    // Type a query unrelated to cricket
    cy.get('input[placeholder="Ask Cricket..."]').clear().type('Tell me about quantum physics');
    cy.get('button').contains('Send').click();
    
    // Wait for the mocked response
    cy.wait('@nonCricketError');
    
    // Verify the UI displays the specific error message from system_prompt.txt
    cy.get('.message.bot .bubble').should('contain', "I'm sorry, I can't generate an answer for that query based on the current database");
  });
});