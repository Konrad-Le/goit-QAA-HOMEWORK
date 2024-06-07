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
  
  it('BAD address test',() => {
    cy.request({method: 'GET', url: 'https://httpbin.org/non-existing-url',
      failOnStatusCode: false}
    ).then((response) =>{
     expect(response.status).to.eq(404)
    })
})
it('test that user-agent set correctly', () => {
  cy.request({method: 'GET', url: 'https://httpbin.org/headers',
      headers: {
        'user-agent': 'My test user-agent'
      },
      failOnStatusCode: false
      }).then(response => {
      assert.equal(200, response.status);
      assert.equal("My test user-agent", response.requestHeaders['user-agent']);
    })
})
it('test that header set correctly', () => {
  cy.request({
    method: 'GET',
    url: 'https://httpbin.org/headers',
    headers: {
      "username": "Bingo"
    },
    failOnStatusCode: false
  }).then(response => {
    assert.equal(200, response.status);
    assert.equal("Bingo", response.requestHeaders.username);
  })
})



it('BODY check', () => {
  const bodyData= {
    "name": "John",
    "age": 30,
    "city": "New York"
    };

  cy.request({method: 'POST',
   url: 'https://httpbin.org/post', 
   body: bodyData,
   failOnStatusCode: false

   }).then((response) =>{
    const expectedBody = {
      "name": "John",
      "age": 30,
      "city": "New York"
      };
     expect(response.status).to.eq(200)
     console.log(bodyData);
     console.log(expectedBody);
     assert.notStrictEqual(expectedBody,response.body);
  })
 })
 it('test duration', () => {
  cy.request({method: 'POST', url: 'https://httpbin.org/post', 
  qs: {
        "username": "Bingo"
      }
  }).then(response => {
    assert.isTrue(response.duration <= 500)
  })
})

it("test random's", () => {
  for(let i = 0; i < 10; i++) {
    const randomId = getRandomInt(10000);

    const request = {
      url: 'https://httpbin.org/headers',
      id: randomId
    }

    cy.request(request).then(response => {
      assert.isTrue(response.status == 200)
    })
  } 
})
})

function getRandomInt(max) {
return Math.floor(Math.random() * max);}
