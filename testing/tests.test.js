
const request = require("supertest");
// Load the expect library - common name for variable is "expect"
const expect = require('expect');
// Get the app instance (e.g. the express instance exported by the web app module)
var app = require('../server').app;


describe("Web Application Tests", () => {
  
  doTests();

  it('should return 200', (done) => {
    request(app)
    .get('/api/articles/')
    .expect(200)
    .end(done);
  });

  it('should return 200', (done) => {
    request(app)
    .get('/api/articles/')
    .expect(200)
    .end(done);
  });

  // Article Test
  it('Should give us title corresponding to article ID', (done) => {
    request(app)
    .get('/api/articles/5c180876debb1a94b78dcb43')
    .expect(200)
    .expect((res) => {
      expect(res.body.titile == "Atlanta Cruise to their First MLS Cup")
    })
    .end(function(err, res) {
      const articleTitle = res.body.title;
      console.log(articleTitle);
      done();
    });
  });
});

async function doTests() {
  await nonUserTests();
  await regularUserTests();
  await adminTests();
}

function nonUserTests() {
  it('Should send 401 when user is not logged in', function(done) {
    request(app)
      .get('/api/users/profile')
      .expect(401, done);
  })

  it('Should not allow comment when user is not logged in', function(done) {
    request(app)
      .post('/api/articles/5c180876debb1a94b78dcb43')
      .send({ user: {username: "Some name"}, comment: "Some comment"})
      .expect(401, done)
  })
}

function regularUserTests() {
  //Authenticate
  var token = null;
  before(function(done) {
    request(app)
      .post('/api/users/authenticate')
      .send({ username: "John", password: "11111111" })
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });
  //Profile Page
  it('Should get a valid token for user: John', function(done) { 
    request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  });
  //Admin Page
  it('Should not allow access to admin privileges', function(done) {
    request(app)
      .get('/api/admin/')
      .set('Authorization', 'Bearer ' + token)
      .expect(401, done);
  })
  //Comment
  it('Should allow comment', function(done) {
    request(app)
      .get('/api/articles/5c180876debb1a94b78dcb43')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  })
}

function adminTests() {
  //Authenticate
  var token = null;
  before(function(done) {
    request(app)
      .post('/api/users/authenticate')
      .send({ username: "abrill", password: "12345678" })
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });
  //Profile Page
  it('Should get a valid token for user: abrill', function(done) { 
    request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  });
  //Admin Page
  it('Should allow access to admin privileges', function(done) {
    request(app)
      .get('/api/admin/')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  })
  //Logout ???
}