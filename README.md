# Flag Explorer

Flag Explorer is a web application that provides information about countries, including their names and flags. The application consists of a backend API built with .NET and a frontend built with Angular.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up the Backend](#setting-up-the-backend)
- [Setting Up the Frontend](#setting-up-the-frontend)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
  - [Backend Tests](#backend-tests)
  - [Frontend Tests](#frontend-tests)
- [CI/CD Pipeline](#cicd-pipeline)

## Prerequisites

Before setting up the application, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (for frontend)
- [Angular CLI](https://angular.io/cli) (for frontend)
- [.NET SDK](https://dotnet.microsoft.com/download/dotnet) (for backend)


---

## Setting Up the Backend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/celumusaBDuma/flag-explore
   cd flag-explorer

2. **Navigate to the server folder:**
    ```bash 
    cd server/FlagExplorer

3. **Install required .NET packages:**
    ```bash
    dotnet restore
4. **Run the backend:**
    ```bash
    dotnet run

## Setting Up the Frontend

1. **Navigate to the frontend directory:**
    ```bash
    cd client

2. **Install frontend dependencies:**
    ```bash
    npm install

3. **Run the frontend application:**
    ```bash
    ng serve
    ```
    The frontend will be available at http://localhost:4200.

## Running Tests


### Backend Tests

Run backend unit and integration tests using the .NET CLI.

1. Navigate to the backend test directory:

    ```bash
    cd server/FlagExplorer.Tests
    ```

2. Run the tests:

    ```bash
    dotnet test
    ```

---

### Frontend Tests


#### End-to-End (E2E) Tests

Use Cypress for browser-based E2E testing.

1. Navigate to the Cypress E2E test directory:

    ```bash
    cd client/cypress/e2e
    ```

2. Launch the Cypress Test Runner:

    ```bash
    npx cypress open
    ```

---

### CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment.

The CI/CD pipeline performs the following steps:

- Builds the backend and frontend
- Runs all tests (unit, integration, and E2E)
- Packages applications for deployment

You can find the pipeline definition in:

```bash
.github/workflows/ci.yml
```
