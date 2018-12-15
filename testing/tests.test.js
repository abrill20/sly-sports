
const request = require("supertest");
// Load the expect library - common name for variable is "expect"
const expect = require('expect');
// Get the app instance (e.g. the express instance exported by the web app module)
var app = require('../server').app;


describe("Web Application Tests", () => {
  // Verify the HTTP GET request to the server root
  // Expect (with Mocha) is the test framework using supertest to handle
  // the HTTP interactions
  
  var token = null;

  before(function(done) {
    request(app)
      .post('/api/users/authenticate')
      .send({ username: "abrill", password: "123456" })
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  it('Should get a valid token for user: abrill', function(done) { 
    request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  });

  it('Should allow access to admin privileges', function(done) {
    request(app)
      .get('/api/admin/')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  })

  // before(function(done) {
  //   request(app)
  //     .post('/api/users/authenticate')
  //     .send({ username: "John", password: "123" })
  //     .end(function(err, res) {
  //       token = res.body.token;
  //       console.log("token is " + token);
  //       done();
        
  //     });
  // });

  // it('should get a valid token for user: John', function(done) { 
  //   request(app)
  //     .get('/api/users/profile')
  //     .set('Authorization', 'Bearer ' + token)
  //     .expect(200, done);
  // });

  // it('should not allow access to admin privileges', function(done) {
  //   request(app)
  //     .get('/api/admin/')
  //     .set('Authorization', 'Bearer ' + token)
  //     .expect(401, done);
  // })

  it('should return 200', (done) => {
    request(app)
    .get('/api/articles/')
    .expect(200)
    .end(done);
  });

  // NO PAGE TEST
  it('should return 404 with error message', (done) => {
    request(app)
    .get('/nosuchpage')
    .expect(200)
    .end(done);
  });

  

});
