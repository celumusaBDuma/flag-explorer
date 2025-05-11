describe('Countries List Page', () => {
  beforeEach(() => {
    cy.visit('/country');
  });

  it('displays a loading spinner if data is loading', () => {
    cy.get('app-spinner').should('exist');
  });

  it('displays a list of countries', () => {
    cy.get('app-country-item').should('have.length.greaterThan', 0);
  });

  it('has a pagination section with next and previous buttons', () => {
    cy.get('.pagination').within(() => {
      cy.contains('Previous').should('exist');
      cy.contains('Next').should('exist');
    });
  });

  it('pagination next button works', () => {
    cy.get('.pagination').contains('Next').click();
    cy.get('app-country-item').first().invoke('text').then(firstCountry => {
      cy.get('.pagination').contains('Next').click();
      cy.get('app-country-item').first().invoke('text').should('not.eq', firstCountry);
    });
  });

  it('disables previous button on the first page', () => {
    cy.get('.pagination').contains('Previous').should('be.disabled');
  });

  it('navigates to a specific page when clicking page number', () => {
    cy.get('.pagination button').contains('2').click();
    cy.get('.pagination button[disabled]').should('contain.text', '2');
  });
});
