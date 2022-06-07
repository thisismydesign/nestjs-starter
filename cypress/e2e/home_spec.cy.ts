describe('index', () => {
  it('contains name', () => {
    cy.visit('/home');
    cy.contains('Hello from NextJS');
  });
});
