describe('template spec', () => {

  it('POST request', () => {
  cy.request({method: 'POST', url: 'https://httpbin.org/post', 
  qs: {
  "username": "Bingo"
    }

}).then((response) =>{
  expect(response.status).to.eq(200)
  assert.equal("Bingo",response.body.args.username)
   })
  })

  it('PUT request', () => {
    cy.request({method: 'PUT', url: 'https://httpbin.org/put',
  qs: {
  "username": "Angel",
    }
  }).then((response) =>{
   expect(response.status).to.eq(200)
  assert.equal("Angel",response.body.args.username)
  })
  })
  it('PATCH request', () => {
  
  cy.request({method: 'PATCH', url: 'https://httpbin.org/patch', 
  qs: {
  "username": "Bravo",
  }
}).then((response) =>{
  expect(response.status).to.eq(200)
  assert.equal("Bravo",response.body.args.username)
  })
  })
  
  it('DELETE request', () => {
  cy.request({method: 'DELETE', url: 'https://httpbin.org/delete'}).then((response) =>{
  expect(response.status).to.eq(200)
  })
  })
  
  it('BAD address',() => {
  cy.request({method: 'GET', url: 'https://httpbin.org/non-existing-url',
      failOnStatusCode: false}
    ).then((response) =>{
  expect(response.status).to.eq(404)
  })
})
})