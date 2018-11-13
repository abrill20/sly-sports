
const request = require("supertest");

// Load the expect library - common name for variable is "expect"
const expect = require('expect');

// Get the app instance (e.g. the express instance exported by the web app module)
var app = require('../server').app;

describe("Web Application Tests", () => {
  // Verify the HTTP GET request to the server root
  // Expect (with Mocha) is the test framework using supertest to handle
  // the HTTP interactions
  it('should return 200', (done) => {
    request(app)
    .get('/api/articles/')
    .expect(200)
    .end(done);
  });

  it('should return 404 with error message', (done) => {
    request(app)
    .get('/nosuchpage')
    .expect(200)
    .end(done);
  });
});
