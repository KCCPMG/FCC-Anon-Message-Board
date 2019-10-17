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
      chai.request(server)
        .post('/api/threads/test')
        .send()
        .end(function (err,res){
          assert.fail();
          done();  
        });
      
    });
    
    suite('GET', function(done) {
      chai.request(server)
        .get('/api/threads/test')
        .send()
        .end(function (err,res){
          assert.fail();
          done();  
        });
    });
    
    suite('DELETE', function(done) {
      chai.request(server)
        .delete('/api/threads/test')
        .send()
        .end(function (err,res){
          assert.fail();
          done();  
        });
    });
    
    suite('PUT', function(done) {
      chai.request(server)
        .put('/api/threads/test')
        .send()
        .end(function (err,res){
          assert.fail();
          done();  
        });
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function(done) {
      chai.request(server)
        .put('/api/replies/test')
        .send()
        .end(function (err,res){
          assert.fail();
          done();  
        });
    });
    
    suite('GET', function(done) {
      assert.fail();
      done();
    });
    
    suite('PUT', function(done) {
      assert.fail();
      done();
    });
    
    suite('DELETE', function(done) {
      assert.fail();
      done();
    });
    
  });

});
