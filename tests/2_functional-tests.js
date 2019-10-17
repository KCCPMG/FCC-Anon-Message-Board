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
    
    // I can POST a thread to a specific message board by passing form data text and delete_password to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).
    suite('POST', function() {
      
      test('POST thread' , function(done){
        chai.request(server)
          .post('/api/threads/apitest')
          .send({
            text: "This is a test",
            delete_password: "Test Delete Password"
          })
          .end(function (err,res){
            console.log(res);
            assert.isOk(res.url, "Res redirect");
            done();  
          });
        });
    });
    
    suite('GET', function() {
      
      test('GET thread', function(done) {
        chai.request(server)
          .get('/api/threads/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
    suite('DELETE', function() {
      
      test('DELETE thread', function(done) {
        chai.request(server)
          .delete('/api/threads/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
    suite('PUT', function() {
      test('PUT thread', function(done) {
        chai.request(server)
          .put('/api/threads/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('POST reply', function(done) {
        chai.request(server)
          .post('/api/replies/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
    suite('GET', function() {
      test('GET reply', function(done){
        chai.request(server)
          .get('/api/replies/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
    suite('PUT', function() {
      test('PUT reply', function(done) {
        chai.request(server)
          .put('/api/replies/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
       })
    });
    
    suite('DELETE', function() {
      test('DELETE reply', function(done){
        chai.request(server)
          .delete('/api/replies/test')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
  });

});
