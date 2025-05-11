describe('Country Details Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/countries/**', {
      fixture: 'country-details.json',
      delay: 500
    }).as('getCountryDetails');

    cy.visit('/country/South%20Africa');
  });

  it('shows a loading spinner while data is being fetched', () => {
    cy.get('app-spinner').should('exist');
    cy.wait('@getCountryDetails');
    cy.get('app-spinner').should('not.exist');
  });

  it('displays the country details once loaded', () => {
    cy.wait('@getCountryDetails');

    cy.get('.country-details img').should('have.attr', 'src').and('include', 'sa.png');
    cy.get('.country-details h2').should('contain.text', 'South Africa');
    cy.contains('Capital:').should('exist');
    cy.contains('Pretoria').should('exist');
    cy.contains('Population:').should('exist');
    cy.contains(/[\d,]+/).should('exist'); // matches formatted population number
  });

  it('has a functional back button', () => {
    cy.wait('@getCountryDetails');
    cy.get('.back-button').click();
    cy.url().should('include', '/countries');
  });
});
