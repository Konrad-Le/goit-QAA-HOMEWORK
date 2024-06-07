describe ("wykorzystanie różnych metod HTTP (GET/POST/etc)", ()=>{
    const apiUrl = 'https://httpbin.org/get';
    const request = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      qs:{
        "username":"konrad"
      },
      failOnStatusCode: false
    };


    it("GET call", ()=>{
        cy.request('https://httpbin.org/get').then(response => {
        const status = response.status;

        assert.equal(200, status);
    })
    });

    it ("POST call", ()=>{
      cy.request(request).then(response=> {
            const status = response.status;
            assert.equal(200,status);
            assert.equal("konrad",response.body.args.username)
          }
          )}
        )
      })
   
    it('PUT call', () => {
      cy.request({
        method: 'PUT',
        url: 'https://httpbin.org/put',
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
              expect(response.status).to.eq(200);
              expect(response.body.id).to.equal("1");
              expect(response.body.title).to.equal('Updated Title');
              expect(response.body).to.have.property('body', 'This is the updated body content.');
            });
          });
        
        //   it('should delete a post using DELETE', () => {
        //     cy.request({
        //       method: 'DELETE',
        //       url: `${apiUrl}/1`
        //     }).then((response) => {
        //       // Sprawdzamy, czy status odpowiedzi to 200
        //       expect(response.status).to.eq(200);
        
        //       // JSONPlaceholder zwraca pusty obiekt po udanym usunięciu
        //       expect(response.body).to.be.empty;
        //     });
        //   });
        // });