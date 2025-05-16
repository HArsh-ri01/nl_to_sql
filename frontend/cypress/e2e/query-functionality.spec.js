// cypress/e2e/query-functionality.spec.js
describe('Query Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    // Don't use interceptApiCall here as we will set up specific intercepts in each test
  });

  it('should submit a valid IPL query and get results', () => {
    // Use direct intercept instead of alias to ensure it's registered correctly
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'SELECT player_name, SUM(runs) as total_runs FROM matches JOIN players ON matches.player_id = players.id WHERE season = 2023 GROUP BY player_name ORDER BY total_runs DESC LIMIT 10',
        result: [
          { player_name: 'Virat Kohli', total_runs: 825 },
          { player_name: 'Shubman Gill', total_runs: 795 }
        ],
        remaining_requests: {
          user_remaining: 95,
          global_remaining: 9800
        }
      }
    }).as('iplQuery');
    
    // Use the custom submitQuery command
    cy.submitQuery('Who scored the most runs in IPL 2023?');
  
    cy.checkResultsTable();
    cy.get('table').should('contain', 'Virat Kohli');
    cy.get('table').should('contain', 'Shubman Gill');
  });

  it('should handle complex queries with multiple tables', () => {
    // Use direct intercept
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'SELECT t.team_name, COUNT(*) as matches_won FROM matches m JOIN teams t ON m.match_winner = t.team_id WHERE m.season = 2022 GROUP BY t.team_name ORDER BY matches_won DESC',
        result: [
          { team_name: 'Gujarat Titans', matches_won: 10 },
          { team_name: 'Rajasthan Royals', matches_won: 9 }
        ],
        remaining_requests: {
          user_remaining: 94,
          global_remaining: 9799
        }
      }
    }).as('complexQuery');
    
    // Submit a complex query
    cy.submitQuery('Which team won the most matches in IPL 2022?');
    
    cy.checkResultsTable();
    cy.get('table').should('contain', 'Gujarat Titans');
    cy.get('table').should('contain', 'Rajasthan Royals');
  });

  it('should handle time-of-day information error from system_prompt.txt', () => {
    // Use direct intercept for error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: The database does not contain time-of-day information, only match dates are available.",
        error: "The database does not contain time-of-day information, only match dates are available.",
        remaining_requests: {
          user_remaining: 92,
          global_remaining: 9797
        }
      }
    }).as('timeOfDayQuery');
    
    // Submit query about time-specific matches
    cy.submitQuery('What matches were played yesterday at 8pm?');
    
    // Check for error message directly
    cy.checkErrorMessage('time-of-day');
  });

  it('should handle non-IPL cricket related queries', () => {
    // Use direct intercept for error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: Please ask a question related to IPL cricket data.",
        error: "Please ask a question related to IPL cricket data.",
        remaining_requests: {
          user_remaining: 91,
          global_remaining: 9796
        }
      }
    }).as('nonIplQuery');
    
    // Submit a query without any IPL keywords
    cy.submitQuery('What is the weather like today?');
    
    // Check for error message directly
    cy.checkErrorMessage('non-ipl');
  });

  it('should handle ambiguous queries that lack context', () => {
    // Use direct intercept for error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: I'm sorry, I can't generate an answer for that query based on the current database.",
        error: "I'm sorry, I can't generate an answer for that query based on the current database.",
        remaining_requests: {
          user_remaining: 90,
          global_remaining: 9795
        }
      }
    }).as('ambiguousQuery');
    
    // Submit a vague query
    cy.submitQuery('Who is the best?');
    
    // Check for error message directly
    cy.checkErrorMessage('ambiguous');
  });

  it('should handle database modification query errors', () => {
    // Use direct intercept for error response
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: I'm sorry, i can't generate answer for that query.",
        error: "I'm sorry, i can't generate answer for that query.",
        remaining_requests: {
          user_remaining: 89,
          global_remaining: 9794
        }
      }
    }).as('dbChangeQuery');
    
    // Submit a query attempting to modify the database
    cy.submitQuery('Update player statistics for Virat Kohli');
    
    // Check for error message directly
    cy.checkErrorMessage('db-change');
  });

  it('should handle SQL validation errors for potentially harmful queries', () => {
    // Use direct intercept for SQL validation error
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "SELECT * FROM players; DROP TABLE players;",
        error: "Generated SQL query appears unsafe: Potentially unsafe SQL pattern detected",
        remaining_requests: {
          user_remaining: 88,
          global_remaining: 9793
        }
      }
    }).as('sqlValidationQuery');
    
    // Submit a query with SQL injection pattern
    cy.submitQuery('Show player data; drop table players;');
    
    // Check for error message directly
    cy.checkErrorMessage('sql-validation');
  });

  it('should handle catch query errors', () => {
    // Use direct intercept for catch error
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "ERROR: Sorry, I Don't Know",
        error: "Sorry, I Don't Know",
        remaining_requests: {
          user_remaining: 87,
          global_remaining: 9792
        }
      }
    }).as('catchesQuery');
    
    // Submit a query about catches
    cy.submitQuery('Who caught the most catches in IPL?');
    
    // Check for error message directly
    cy.checkErrorMessage('catches');
  });

  it('should handle keyboard submission with Enter key', () => {
    // Use direct intercept
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: 'SELECT player_name, SUM(sixes) as total_sixes FROM matches JOIN players ON matches.player_id = players.id GROUP BY player_name ORDER BY total_sixes DESC LIMIT 5',
        result: [
          { player_name: 'Chris Gayle', total_sixes: 357 },
          { player_name: 'AB de Villiers', total_sixes: 251 }
        ],
        remaining_requests: {
          user_remaining: 86,
          global_remaining: 9791
        }
      }
    }).as('enterQuery');
    
    // Type query and press Enter instead of clicking button
    cy.get('input[placeholder="Ask Cricket..."]').clear().type('Who has hit the most sixes in IPL?{enter}');
    
    cy.checkResultsTable();
    cy.get('table').should('contain', 'Chris Gayle');
    cy.get('table').should('contain', '357');
  });

  it('should handle hitting request limits gracefully', () => {
    // Use direct intercept for request limit error
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
    
    // Submit query
    cy.submitQuery('Show me bowlers with most wickets');
    
    // Verify limit exceeded message is displayed
    cy.get('.message.bot .bubble').should('contain', 'exceeded your daily limit');
    
    // No results table should be shown
    cy.get('table').should('not.exist');
  });

  it('should handle suspicious UNION usage patterns in SQL validation', () => {
    // Use direct intercept for UNION injection
    cy.intercept('POST', `${Cypress.env('apiUrl')}/process_query/`, {
      statusCode: 200,
      body: {
        sql_query: "SELECT player_name FROM players UNION SELECT 1,2,3",
        error: "Generated SQL query appears unsafe: Suspicious UNION usage pattern detected",
        remaining_requests: {
          user_remaining: 84,
          global_remaining: 9789
        }
      }
    }).as('unionInjectionQuery');
    
    // Submit query with potential SQL UNION injection
    cy.submitQuery('Show player names UNION with 1,2,3');
    
    // Verify SQL validation error message appears
    cy.get('.message.bot .bubble').should('contain', 'SQL query appears unsafe');
  });
});