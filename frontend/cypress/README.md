# Cypress Integration Tests

This directory contains integration tests for the Natural Language to SQL application using Cypress.

## Test Structure

The tests are organized into the following categories:

- **Basic Tests** (`home.spec.js`): Tests for basic page loading and UI validation
- **Query Functionality** (`query-functionality.spec.js`): Tests for submitting queries and handling responses
- **Error Handling** (`error-handling.spec.js`): Tests for various error scenarios
- **Mocked Responses** (`mocked-responses.spec.js`): Tests with mocked API responses
- **Fixture-based Tests** (`fixture-based-tests.spec.js`): Tests using JSON fixture data
- **UI Component Tests** (`ui-components.spec.js`): Tests for UI components and responsiveness

## Running the Tests

### Prerequisites

- Node.js installed
- Frontend dependencies installed (`npm install`)
- Backend running (for end-to-end tests)

### Running Tests in the Cypress UI

```bash
npm run cypress
```

This opens the Cypress Test Runner where you can run individual test files or all tests.

### Running Tests Headlessly

```bash
npm run cypress:headless
```

or

```bash
npm test
```

### Running Specific Test Files

```bash
npx cypress run --spec "cypress/e2e/home.spec.js"
```

## Test Environment Configuration

The tests are configured to run against a local development environment by default:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

To modify these settings, update the `cypress.config.js` file.

## Adding Data-testid Attributes

For the tests to work properly, make sure your React components have the appropriate `data-testid` attributes:

```jsx
<div data-testid="sql-query">{sqlQuery}</div>
<div data-testid="results-table">...</div>
<div data-testid="error-message">{errorMessage}</div>
<div data-testid="loading-indicator">...</div>
<div data-testid="response-container">...</div>
```

## Troubleshooting

- If tests fail with element not found errors, check if the selectors match your actual DOM elements
- For end-to-end tests, ensure the backend is running and accessible
- To debug tests, use `cy.log()` or `.debug()` to inspect elements
