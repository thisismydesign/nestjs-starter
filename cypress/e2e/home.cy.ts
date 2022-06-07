describe('/home', () => {
  it('contains welcome message', () => {
    cy.visit('/home');
    cy.contains('Hello from NextJS');
  });
});
