/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function(done) {
      assert.false();
      done();
    });
    
    suite('GET', function(done) {
      assert.false();
      done();
    });
    
    suite('DELETE', function(done) {
      assert.false();
      done();
    });
    
    suite('PUT', function(done) {
      assert.false();
      done();
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function(done) {
      assert.false();
      done();
    });
    
    suite('GET', function(done) {
      assert.false();
      done();
    });
    
    suite('PUT', function(done) {
      assert.false();
      done();
    });
    
    suite('DELETE', function(done) {
      assert.false();
      done();
    });
    
  });

});
