describe('Country Item Component', () => {
  beforeEach(() => {
    cy.visit('/country/greece');
  });

  it('displays a flag image and name for each country', () => {
    cy.get('app-country-item').each(($el) => {
      cy.wrap($el).find('img.flag').should('have.attr', 'src');
      cy.wrap($el).find('a.country-link').should('contain.text', '');
    });
  });

  it('navigates to country details on link click', () => {
    cy.get('app-country-item').first().within(() => {
      cy.get('a.country-link').click();
    });

    cy.url().should('include', '/country/');
  });
});
