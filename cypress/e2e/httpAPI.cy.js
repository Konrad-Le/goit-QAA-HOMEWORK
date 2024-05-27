describe('HTTP PUT and DELETE Example', () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  it('should update a post using PUT', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/1`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        id: 1,
        title: 'Updated Title',
        body: 'This is the updated body content.',
        userId: 1
      }
    }).then((response) => {
      // Sprawdzamy, czy status odpowiedzi to 200
      expect(response.status).to.eq(200);

      // Sprawdzamy, czy odpowiedź zawiera zaktualizowane dane
      expect(response.body).to.have.property('title', 'Updated Title');
      expect(response.body).to.have.property('body', 'This is the updated body content.');
    });
  });

  it('should delete a post using DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/1`
    }).then((response) => {
      // Sprawdzamy, czy status odpowiedzi to 200
      expect(response.status).to.eq(200);

      // JSONPlaceholder zwraca pusty obiekt po udanym usunięciu
      expect(response.body).to.be.empty;
    });
  });
});